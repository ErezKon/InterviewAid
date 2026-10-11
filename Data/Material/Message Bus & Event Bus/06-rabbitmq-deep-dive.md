# 6. RabbitMQ Deep Dive

## Table of Contents

- [6.1 What RabbitMQ Is](#61-what-rabbitmq-is)
- [6.2 The AMQP 0-9-1 Model](#62-the-amqp-0-9-1-model)
- [6.3 Exchange Types](#63-exchange-types)
- [6.4 Queue Types: Classic, Quorum, Streams](#64-queue-types-classic-quorum-streams)
- [6.5 Connections, Channels and Consumers](#65-connections-channels-and-consumers)
- [6.6 Reliability: Confirms, Acks, Persistence](#66-reliability-confirms-acks-persistence)
- [6.7 Dead Lettering, TTL, Retries and Delays](#67-dead-lettering-ttl-retries-and-delays)
- [6.8 Prefetch, Flow Control and Performance](#68-prefetch-flow-control-and-performance)
- [6.9 Clustering, High Availability and Federation](#69-clustering-high-availability-and-federation)
- [6.10 Code Examples](#610-code-examples)
- [6.11 Typical Topologies for Microservices](#611-typical-topologies-for-microservices)
- [6.12 Operations and Monitoring](#612-operations-and-monitoring)
- [6.13 Anti-Patterns](#613-anti-patterns)
- [6.14 Interview Talking Points](#614-interview-talking-points)

---

> **Purpose:** RabbitMQ is the most widely deployed open-source message broker and the default "message bus transport" for many microservice stacks (especially .NET with MassTransit/NServiceBus, Spring AMQP, Celery). Know its model cold.

---

## 6.1 What RabbitMQ Is

- Open-source message broker written in **Erlang/OTP** (now maintained by Broadcom / VMware Tanzu team).
- Speaks **AMQP 0-9-1** natively; **AMQP 1.0** natively since **RabbitMQ 4.0**; **MQTT** and **STOMP** (also over WebSockets) via plugins; has a **Stream protocol** for streams.
- Ports: **5672** (AMQP), **5671** (AMQPS), **15672** (management UI/HTTP API), **5552** (streams), **1883** (MQTT), **61613** (STOMP).
- Key 4.x changes: classic queue **mirroring removed** (use quorum queues), **Khepri** (Raft-based) metadata store replacing Mnesia, quorum queues default delivery-limit of 20.

---

## 6.2 The AMQP 0-9-1 Model

**Producers never publish directly to queues.** They publish to an **exchange** with a **routing key**; the exchange routes copies to **queues** according to **bindings**; consumers read from queues.

```mermaid
flowchart LR
    P[Producer] -->|"publish(exchange='orders',<br/>routingKey='order.created.eu')"| X{{Exchange: orders<br/>type: topic}}
    X -->|"binding: order.created.*"| Q1[(queue: billing)]
    X -->|"binding: order.#"| Q2[(queue: audit)]
    X -->|"binding: *.*.us"| Q3[(queue: us-warehouse)]
    Q1 --> C1[Billing consumer]
    Q2 --> C2[Audit consumer]
    style X fill:#EF5350,color:#fff
```

| Concept | Description |
|---|---|
| **Virtual host (vhost)** | Logical namespace with its own exchanges, queues and permissions — multi-tenancy |
| **Exchange** | Routing agent; has a name, type, durability |
| **Binding** | Rule linking an exchange to a queue (or another exchange) with a binding key / arguments |
| **Routing key** | String attached to each message, matched against bindings |
| **Queue** | Ordered buffer storing messages until consumed; durable/transient, exclusive, auto-delete |
| **Message** | Body (bytes) + properties (`delivery_mode`, `content_type`, `message_id`, `correlation_id`, `reply_to`, `expiration`, `priority`, `headers`) |
| **Default exchange** (`""`) | Pre-declared direct exchange; every queue is bound to it with its own name → "publish to a queue by name" |

---

## 6.3 Exchange Types

| Type | Routing rule | Typical use |
|---|---|---|
| **Direct** | Routing key **equals** binding key | Commands to a specific queue, routing by severity/type |
| **Fanout** | Ignores routing key, copies to **all** bound queues | Broadcast events |
| **Topic** | Pattern match on dot-separated words: `*` = exactly one word, `#` = zero or more words | Event routing by category/region |
| **Headers** | Matches message headers (`x-match: all` or `any`) instead of routing key | Routing on multiple attributes |
| **Consistent hash** (plugin) | Hashes the routing key to distribute across queues | Partitioned, per-key ordered processing |
| **Delayed message** (plugin) | Holds messages until `x-delay` elapses | Scheduled delivery |
| **Exchange-to-exchange bindings** | Exchanges bound to exchanges | Layered routing topologies |

```mermaid
flowchart TB
    subgraph Direct
        PD[Producer] -->|rk=error| XD{{direct}}
        XD -->|bk=error| QE[(errors)]
        XD -.->|bk=info| QI[(info)]
    end
    subgraph Fanout
        PF[Producer] --> XF{{fanout}}
        XF --> QF1[(q1)]
        XF --> QF2[(q2)]
        XF --> QF3[(q3)]
    end
    subgraph Topic
        PT[Producer] -->|rk=stock.nyse.ibm| XT{{topic}}
        XT -->|stock.nyse.*| QT1[(nyse)]
        XT -->|stock.#| QT2[(all stocks)]
        XT -.->|stock.nasdaq.*| QT3[(nasdaq)]
    end
```

**Topic matching examples** for routing key `order.created.eu`:

| Binding key | Match? |
|---|---|
| `order.created.eu` | ✅ |
| `order.*.eu` | ✅ |
| `order.#` | ✅ |
| `#` | ✅ (everything) |
| `order.*` | ❌ (`*` is exactly one word) |
| `*.created` | ❌ |

**Alternate exchange:** messages that match no binding are normally dropped (or returned with `mandatory`). An `alternate-exchange` argument sends them to a catch-all exchange instead.

---

## 6.4 Queue Types: Classic, Quorum, Streams

| Feature | Classic queue | Quorum queue | Stream |
|---|---|---|---|
| Replication | None (single node) in 4.x | **Raft** across nodes (typically 3 or 5) | Replicated log |
| Data safety | Lost if the node's disk is lost | Survives minority node failures | Survives minority failures |
| Consumption | Destructive (deleted on ack) | Destructive | **Non-destructive** — read from any offset, replay |
| Poison message handling | Manual | **Delivery limit** (default 20 in 4.x) → DLX | N/A |
| Priorities | ✅ (`x-max-priority`) | ✅ (simplified, 4.0+) | ❌ |
| Non-durable / exclusive | ✅ | ❌ (always durable) | ❌ |
| Use for | Temporary/exclusive queues, reply queues, non-critical data | **Default for durable business queues** | Large fan-out, replay, very long queues, high throughput |

```bash
# Declare a quorum queue with the management CLI
rabbitmqadmin declare queue name=billing durable=true arguments='{"x-queue-type":"quorum"}'
```

> **Super streams** partition a stream across several streams (like Kafka partitions) for scaling with per-key ordering.

---

## 6.5 Connections, Channels and Consumers

```mermaid
flowchart LR
    APP[Application process] -->|one long-lived TCP connection| BR[RabbitMQ node]
    subgraph Conn["Connection (TCP, TLS, auth)"]
        CH1[Channel 1: publishing]
        CH2[Channel 2: consumer A]
        CH3[Channel 3: consumer B]
    end
    APP --- Conn
```

- **Connection:** expensive TCP (+TLS) connection — keep **long-lived**, typically one or two per process (separate for publishing and consuming so publisher flow control doesn't block consumers).
- **Channel:** lightweight virtual connection multiplexed over a connection. **Not thread-safe** in most clients — use one per thread/consumer.
- **Consumer:** subscription on a channel (`basic.consume`); the broker pushes messages. `basic.get` (polling) exists but is inefficient.
- **Exclusive consumer / single active consumer:** only one consumer receives messages at a time; others are on standby — preserves order with failover.

---

## 6.6 Reliability: Confirms, Acks, Persistence

To avoid message loss you need **all four**:

| Layer | Setting |
|---|---|
| Queue survives restart | `durable=true` (quorum queues are always durable) |
| Message survives restart | `delivery_mode=2` (persistent) |
| Producer knows it was stored | **Publisher confirms** (`confirm.select`), handle `basic.ack`/`basic.nack` from broker |
| Consumer doesn't lose on crash | **Manual acks** (`autoAck=false`), ack after processing |

Additional safeguards:
- `mandatory=true` + return handler (or alternate exchange) to detect **unroutable** messages.
- **Quorum queues** for replication.
- **Consumer acknowledgement timeout** (`consumer_timeout`, default 30 minutes) closes channels that never ack — protects against stuck consumers.

Consumer responses:

| Method | Effect |
|---|---|
| `basic.ack` | Processed — delete |
| `basic.nack(requeue=true)` | Put back in the queue (careful: immediate tight loops) |
| `basic.nack(requeue=false)` / `basic.reject` | Discard or **dead-letter** if a DLX is configured |
| `multiple=true` | Ack/nack all deliveries up to this tag (batching) |

---

## 6.7 Dead Lettering, TTL, Retries and Delays

A message is **dead-lettered** when it is rejected with `requeue=false`, its **TTL expires**, the queue exceeds its **length limit**, or a quorum queue's **delivery limit** is exceeded.

```mermaid
flowchart LR
    P[Producer] --> X{{orders}}
    X --> Q[(billing<br/>x-dead-letter-exchange: billing.dlx)]
    Q --> C[Consumer]
    C -->|reject requeue=false| Q
    Q -->|dead-letter| DLX{{billing.dlx}}
    DLX --> DLQ[(billing.dlq)]
    style DLQ fill:#757575,color:#fff
```

### Delayed retry with TTL + DLX ("retry queue" pattern)

```mermaid
flowchart LR
    Q[(work)] -->|reject| DLX1{{work.retry}}
    DLX1 --> RQ[(work.retry.30s<br/>x-message-ttl: 30000<br/>x-dead-letter-exchange: work)]
    RQ -->|TTL expires → dead-letter| W{{work exchange}}
    W --> Q
```

- Failed messages go to a **wait queue** without consumers; when the TTL expires they are dead-lettered **back** to the work exchange.
- Use several wait queues (10 s, 1 min, 10 min) for exponential backoff, and count attempts with the `x-death` header (or a custom header); after N attempts route to a final DLQ.
- Alternative: the **delayed message exchange plugin** (`x-delayed-type`, `x-delay` header) — simpler, but delayed messages are stored on a single node (not replicated).
- Bus frameworks (MassTransit, NServiceBus) implement delayed redelivery for you.

### Queue arguments cheat sheet

| Argument | Purpose |
|---|---|
| `x-queue-type` | `classic`, `quorum`, `stream` |
| `x-dead-letter-exchange` / `x-dead-letter-routing-key` | Where dead letters go |
| `x-message-ttl` | Per-queue message TTL (ms) |
| `x-expires` | Delete the queue after inactivity |
| `x-max-length` / `x-max-length-bytes` | Bound the queue |
| `x-overflow` | `drop-head` (default), `reject-publish`, `reject-publish-dlx` |
| `x-max-priority` | Enable priorities |
| `x-delivery-limit` | Quorum queue poison message limit |
| `x-single-active-consumer` | Only one consumer active at a time |

> Prefer **policies** (`rabbitmqctl set_policy`) over hard-coded queue arguments where possible: policies can be changed at runtime without redeclaring queues.

---

## 6.8 Prefetch, Flow Control and Performance

**Prefetch (`basic.qos`)** = maximum unacked messages delivered to a consumer.

| Prefetch | Effect |
|---|---|
| Unlimited (0) | Broker floods one consumer; memory pressure; poor load balancing |
| 1 | Perfectly fair dispatch but low throughput (round-trip per message) |
| 10–300 | Typical sweet spot; tune with measurement |

**Flow control & alarms:**
- **Memory high watermark** (default 0.6 of RAM) and **disk free limit** trigger **alarms** that **block publishers** cluster-wide until resolved.
- Credit-based flow control slows fast publishers per connection.

**Performance tips:**
- Keep queues **short** — RabbitMQ is happiest when messages flow through quickly; very long queues hurt (use streams if you need backlog/retention).
- Use **multiple queues** to spread load across cores/nodes (a single queue is bound to one Erlang process/leader).
- Batch publisher confirms (async confirms) instead of waiting for each one.
- Reuse connections and channels; avoid opening a connection per message.
- Messages ideally small (KBs); use Claim Check for large payloads.

---

## 6.9 Clustering, High Availability and Federation

| Mechanism | Purpose | Notes |
|---|---|---|
| **Cluster** | Several nodes sharing metadata (users, vhosts, exchanges, queues) in one LAN/region | Use an **odd number** of nodes (3, 5) for quorum |
| **Quorum queues / streams** | Data replication & failover | Leader + followers via Raft |
| **Federation plugin** | Loosely link brokers across WAN/regions; exchanges/queues receive messages from upstreams | Tolerant to latency and partitions |
| **Shovel plugin** | Move messages from a source to a destination (queue → exchange) across brokers | Migrations, bridging |
| **Warm standby / schema sync** | Commercial (Tanzu RabbitMQ) cross-cluster replication | DR |

**Network partitions:** with quorum queues, the minority side cannot accept writes for those queues (CP behavior). Plan cluster placement across availability zones with low latency.

**Running on Kubernetes:** use the **RabbitMQ Cluster Kubernetes Operator** and the **Messaging Topology Operator** (declare exchanges/queues/bindings as CRDs).

---

## 6.10 Code Examples

### Node.js (amqplib) — topic exchange with DLX

```typescript
import amqp from 'amqplib';

const conn = await amqp.connect('amqp://guest:guest@localhost:5672');

// ── Topology ───────────────────────────────────────────
const setup = await conn.createChannel();
await setup.assertExchange('orders', 'topic', { durable: true });
await setup.assertExchange('billing.dlx', 'fanout', { durable: true });
await setup.assertQueue('billing.dlq', { durable: true, arguments: { 'x-queue-type': 'quorum' } });
await setup.bindQueue('billing.dlq', 'billing.dlx', '');
await setup.assertQueue('billing', {
  durable: true,
  arguments: {
    'x-queue-type': 'quorum',
    'x-dead-letter-exchange': 'billing.dlx',
    'x-delivery-limit': 5,
  },
});
await setup.bindQueue('billing', 'orders', 'order.created.*');

// ── Publisher with confirms ────────────────────────────
const pub = await conn.createConfirmChannel();
pub.publish('orders', 'order.created.eu',
  Buffer.from(JSON.stringify({ orderId: '42', total: 99.5 })),
  { persistent: true, contentType: 'application/json', messageId: crypto.randomUUID() });
await pub.waitForConfirms();

// ── Consumer with manual ack ───────────────────────────
const sub = await conn.createChannel();
await sub.prefetch(50);
await sub.consume('billing', async msg => {
  if (!msg) return;
  try {
    const order = JSON.parse(msg.content.toString());
    await createInvoice(order);           // idempotent
    sub.ack(msg);
  } catch (err) {
    sub.nack(msg, false, false);          // dead-letter (no requeue)
  }
}, { noAck: false });
```

### C# (RabbitMQ.Client 7.x, async API)

```csharp
var factory = new ConnectionFactory { HostName = "localhost" };
await using var connection = await factory.CreateConnectionAsync();

// Publisher confirms are enabled through channel options in 7.x
await using var channel = await connection.CreateChannelAsync(
    new CreateChannelOptions(publisherConfirmationsEnabled: true,
                             publisherConfirmationTrackingEnabled: true));

await channel.ExchangeDeclareAsync("orders", ExchangeType.Topic, durable: true);

var body = JsonSerializer.SerializeToUtf8Bytes(new { OrderId = 42, Total = 99.5m });
var props = new BasicProperties
{
    Persistent = true,
    ContentType = "application/json",
    MessageId = Guid.NewGuid().ToString()
};

// Awaiting completes when the broker confirms (throws on nack/return)
await channel.BasicPublishAsync("orders", "order.created.eu", mandatory: true, props, body);
```

### Python — RPC with Direct Reply-To

```python
import pika, uuid

conn = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
ch = conn.channel()
corr_id = str(uuid.uuid4())
response = None

def on_reply(ch, method, props, body):
    global response
    if props.correlation_id == corr_id:
        response = body

# Pseudo-queue: no need to declare a reply queue
ch.basic_consume(queue="amq.rabbitmq.reply-to", on_message_callback=on_reply, auto_ack=True)
ch.basic_publish(exchange="", routing_key="pricing.rpc",
                 properties=pika.BasicProperties(reply_to="amq.rabbitmq.reply-to",
                                                 correlation_id=corr_id),
                 body=b'{"sku":"ABC"}')
while response is None:
    conn.process_data_events(time_limit=1)
```

---

## 6.11 Typical Topologies for Microservices

### Events: one exchange per event type, one queue per subscribing service

```mermaid
flowchart LR
    OS[Order Service] -->|publish| X1{{"exchange: OrderPlaced (fanout)"}}
    X1 --> QB[(billing.order-placed)]
    X1 --> QI[(inventory.order-placed)]
    X1 --> QN[(notifications.order-placed)]
    QB --> B1[billing #1]
    QB --> B2[billing #2]
    QI --> I1[inventory]
    QN --> N1[notifications]
```

This is exactly what **MassTransit** creates by convention (exchange per message type, exchange-to-exchange bindings, queue per endpoint).

### Commands: queue per receiving endpoint

```mermaid
flowchart LR
    API[Checkout API] -->|send ChargeCustomer| QP[(payments)]
    ADM[Admin UI] -->|send ChargeCustomer| QP
    QP --> P1[payments #1]
    QP --> P2[payments #2]
```

### Topic exchange for region/category routing

Routing keys like `<entity>.<event>.<region>` (`order.created.eu`) and bindings per need: `order.*.eu`, `order.cancelled.*`, `#`.

---

## 6.12 Operations and Monitoring

| Tool | Use |
|---|---|
| **Management UI** (`:15672`) | Inspect queues, rates, connections; publish/get test messages |
| **rabbitmqctl / rabbitmq-diagnostics / rabbitmq-queues** | Cluster status, health checks, policies, quorum membership |
| **Prometheus plugin** (`rabbitmq_prometheus`, port 15692) + Grafana dashboards | Production metrics |
| **Definitions export/import** | Version-control topology (users, vhosts, exchanges, queues, bindings, policies) |

Key metrics: `messages_ready`, `messages_unacknowledged`, publish/deliver/ack rates, consumer count per queue (0 = trouble), memory/disk alarms, file descriptors, connection churn, quorum queue leader distribution, DLQ depth.

---

## 6.13 Anti-Patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Opening a connection per message | Huge overhead, connection churn | Long-lived connections, pooled channels |
| Sharing a channel across threads | Frame interleaving errors | One channel per thread |
| `autoAck=true` for business messages | Loss on consumer crash | Manual acks after processing |
| `nack(requeue=true)` on every error | Tight infinite loop, CPU burn | Delayed retry + delivery limit + DLQ |
| Unlimited prefetch | One consumer hoards messages, memory blow-up | Set prefetch |
| Using RabbitMQ as a database / long-term store | Long queues degrade performance | Keep queues short; use streams or a DB |
| Classic non-replicated queues for critical data | Data loss on node failure | Quorum queues |
| Huge messages (MBs) | Memory pressure, slow replication | Claim Check |
| Declaring topology ad hoc in every service without conventions | Drift, unexpected bindings | Conventions (bus framework), definitions, operators |

---

## 6.14 Interview Talking Points

| Question | Strong answer |
|---|---|
| Explain the RabbitMQ model | Producers publish to exchanges with a routing key; bindings route copies to queues; consumers read from queues and ack. Exchange types: direct, fanout, topic, headers. |
| How do you guarantee no message loss? | Durable (quorum) queues, persistent messages, publisher confirms, manual consumer acks after processing, plus mandatory/alternate exchange for unroutable messages. |
| Classic vs quorum vs stream? | Classic = single node, fast, for transient queues; quorum = Raft-replicated, durable default with delivery limits; stream = replayable append-only log for fan-out and retention. |
| How do you implement retries with backoff? | DLX + TTL wait queues that dead-letter back to the work exchange, the delayed-message plugin, or let the bus framework do delayed redelivery; cap attempts and route to a DLQ. |
| How do you preserve ordering? | One queue with a single active consumer, or partition by key with the consistent-hash exchange / super streams; avoid requeue-based retries which reorder. |
| How does RabbitMQ handle backpressure? | Credit-based flow control per connection, memory/disk alarms that block publishers, queue length limits with `reject-publish`, and consumer prefetch. |
