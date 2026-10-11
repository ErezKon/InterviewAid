# 8. Service Bus Frameworks and Abstractions

## Table of Contents

- [8.1 Why a Framework on Top of the Broker?](#81-why-a-framework-on-top-of-the-broker)
- [8.2 What These Frameworks Provide](#82-what-these-frameworks-provide)
- [8.3 .NET: MassTransit, NServiceBus, Wolverine, Brighter, Rebus](#83-net-masstransit-nservicebus-wolverine-brighter-rebus)
- [8.4 Java: Spring Cloud Stream, Spring AMQP / Kafka, Axon, Apache Camel](#84-java-spring-cloud-stream-spring-amqp--kafka-axon-apache-camel)
- [8.5 Polyglot / Cloud-Native: Dapr, Knative Eventing](#85-polyglot--cloud-native-dapr-knative-eventing)
- [8.6 Node.js, Python and Go Options](#86-nodejs-python-and-go-options)
- [8.7 In-Process Buses (Mediator Pattern)](#87-in-process-buses-mediator-pattern)
- [8.8 Comparison Table](#88-comparison-table)
- [8.9 Testing Message-Based Code](#89-testing-message-based-code)
- [8.10 Interview Talking Points](#810-interview-talking-points)

---

> **Purpose:** In real codebases "the message bus" is usually a *library* (MassTransit, NServiceBus, Spring Cloud Stream, Dapr…) wrapping a broker. Know what they give you, how they differ, and when the raw client is enough.

---

## 8.1 Why a Framework on Top of the Broker?

Using a raw client (RabbitMQ.Client, `pika`, `amqplib`, Kafka clients, AWS SDK) means every team re-implements the same things: serialization, topology, retries, error queues, outbox, correlation, tracing, sagas. A **service bus framework** gives you:

```mermaid
flowchart TB
    APP["Your handlers:<br/>OrderPlacedConsumer"] --> FW
    subgraph FW["Bus framework"]
        direction LR
        S[Serialization<br/>+ type mapping] --> R[Routing &<br/>topology conventions]
        R --> RT[Retries, delayed<br/>redelivery, DLQ]
        RT --> O[Outbox / Inbox]
        O --> SG[Sagas / state machines]
        SG --> OB[Tracing, metrics,<br/>logging]
    end
    FW --> T{Transport}
    T --> RMQ[RabbitMQ]
    T --> ASB[Azure Service Bus]
    T --> SQS[Amazon SQS/SNS]
    T --> K[Kafka / Event Hubs]
    T --> MEM[In-memory<br/>for tests]
```

**Key benefit — transport abstraction:** the same handler code runs over RabbitMQ locally, Azure Service Bus in production, and an in-memory transport in tests.

**Cost:** another dependency (sometimes commercial), conventions to learn, and abstraction leaks (Kafka semantics differ fundamentally from queues).

---

## 8.2 What These Frameworks Provide

| Capability | Description |
|---|---|
| **Send / Publish / Request** API | Commands to endpoints, events to subscribers, request-response |
| **Convention-based topology** | Auto-create queues, exchanges/topics, subscriptions per message type |
| **Message type ↔ routing** | Polymorphic routing (subscribe to an interface, receive all implementations) |
| **Retry policies** | Immediate + delayed (second-level) retries with backoff |
| **Error / DLQ handling** | Faulted messages moved to an error queue with exception details |
| **Transactional outbox & inbox** | Atomic DB + publish, deduplication on receive |
| **Sagas / process managers** | Persistent state machines correlated by ID, with timeouts |
| **Scheduling** | Deferred/scheduled messages |
| **Middleware pipeline** | Filters for logging, validation, auth, tenancy |
| **Observability** | OpenTelemetry tracing and metrics out of the box |
| **Testing harnesses** | In-memory buses and assertions on sent/published messages |

---

## 8.3 .NET: MassTransit, NServiceBus, Wolverine, Brighter, Rebus

### MassTransit
- Most popular .NET service bus. Transports: RabbitMQ, Azure Service Bus, Amazon SQS/SNS, ActiveMQ, Kafka & Event Hubs ("Riders"), PostgreSQL/SQL Server (SQL transport), in-memory.
- Features: consumers, **state-machine sagas** (Automatonymous), **Courier** routing slips, transactional outbox (EF Core, MongoDB), request client, scheduling, test harness.
- **Licensing:** v8 is open source (Apache 2.0); the project announced that **v9 moves to a commercial license** (2025). Check the current terms before adopting.

```csharp
public class OrderStateMachine : MassTransitStateMachine<OrderState>
{
    public State Submitted { get; private set; } = null!;
    public State Paid { get; private set; } = null!;

    public Event<OrderSubmitted> OrderSubmitted { get; private set; } = null!;
    public Event<PaymentCaptured> PaymentCaptured { get; private set; } = null!;

    public OrderStateMachine()
    {
        InstanceState(x => x.CurrentState);
        Event(() => OrderSubmitted, e => e.CorrelateById(m => m.Message.OrderId));
        Event(() => PaymentCaptured, e => e.CorrelateById(m => m.Message.OrderId));

        Initially(
            When(OrderSubmitted)
                .Then(ctx => ctx.Saga.Total = ctx.Message.Total)
                .Send(new Uri("queue:payments"), ctx => new CapturePayment(ctx.Saga.CorrelationId, ctx.Saga.Total))
                .TransitionTo(Submitted));

        During(Submitted,
            When(PaymentCaptured)
                .Publish(ctx => new OrderPaid(ctx.Saga.CorrelationId))
                .TransitionTo(Paid));
    }
}
```

### NServiceBus (Particular Software)
- Commercial, very mature, strong focus on reliability: built-in outbox, recoverability (immediate + delayed retries), sagas with timeouts, **ServicePulse/ServiceInsight** for monitoring and replaying failed messages.
- Transports: RabbitMQ, Azure Service Bus, Amazon SQS, SQL Server, PostgreSQL, Azure Storage Queues, Learning transport.

```csharp
public class OrderPlacedHandler : IHandleMessages<OrderPlaced>
{
    public async Task Handle(OrderPlaced message, IMessageHandlerContext context)
    {
        await context.Send(new ChargeCustomer { OrderId = message.OrderId });
        await context.Publish(new BillingStarted { OrderId = message.OrderId });
    }
}
```

### Wolverine (JasperFx)
- Open-source "next-gen" mediator **and** message bus in one; integrates tightly with Marten (PostgreSQL event store). Low-ceremony handlers (plain methods), durable inbox/outbox, transports for RabbitMQ, ASB, SQS, Kafka, Pulsar, local queues.

### Brighter / Rebus
- **Brighter:** command processor + dispatcher, outbox/inbox, many transports (Paramore). Open source.
- **Rebus:** lean, open-source service bus with a simple API; many transports.

---

## 8.4 Java: Spring Cloud Stream, Spring AMQP / Kafka, Axon, Apache Camel

### Spring Cloud Stream
- Binder abstraction over RabbitMQ, Kafka, Pulsar, Solace, Kinesis, Azure Event Hubs/Service Bus, Google Pub/Sub. Functional model (`Supplier`, `Function`, `Consumer` beans) bound to destinations via config.

```java
@SpringBootApplication
public class BillingApp {
    @Bean
    public Consumer<OrderPlaced> orderPlaced(InvoiceService invoices) {
        return event -> invoices.create(event.orderId(), event.total());
    }
}
```
```yaml
spring:
  cloud:
    stream:
      bindings:
        orderPlaced-in-0:
          destination: orders
          group: billing          # consumer group → durable, load-balanced
      rabbit:
        bindings:
          orderPlaced-in-0:
            consumer:
              auto-bind-dlq: true
              republish-to-dlq: true
```

### Spring AMQP / Spring for Apache Kafka
Lower-level templates and listeners (`RabbitTemplate`, `@RabbitListener`, `KafkaTemplate`, `@KafkaListener`, `@RetryableTopic`) when you need broker-specific control.

### Axon Framework
CQRS + Event Sourcing framework with command bus, event bus, query bus and sagas; Axon Server as event store and message router.

### Apache Camel
Integration framework implementing the EIP catalog with hundreds of components (routing DSL: `from("rabbitmq:orders").filter(...).to("kafka:audit")`). The spiritual successor of ESB ideas, but embedded in services.

---

## 8.5 Polyglot / Cloud-Native: Dapr, Knative Eventing

### Dapr (Distributed Application Runtime)
- A **sidecar** exposing building blocks over HTTP/gRPC, including **pub/sub**. The app publishes to `localhost:3500/v1.0/publish/<pubsub>/<topic>`; Dapr talks to the configured broker (Kafka, RabbitMQ, Redis, ASB, SNS/SQS, Pub/Sub, NATS, Pulsar…).
- Uses **CloudEvents** envelopes, supports at-least-once, dead-letter topics, routing rules, outbox (state store + pub/sub).
- Swap brokers by changing a YAML component, without code changes.

```yaml
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: orders-pubsub
spec:
  type: pubsub.rabbitmq
  version: v1
  metadata:
    - name: connectionString
      value: "amqp://rabbitmq:5672"
```

```bash
curl -X POST http://localhost:3500/v1.0/publish/orders-pubsub/order-placed \
     -H "Content-Type: application/json" -d '{"orderId":"42"}'
```

### Knative Eventing
Kubernetes-native event mesh: **Brokers** and **Triggers** (filter on CloudEvents attributes) deliver events over HTTP to services; backed by Kafka, RabbitMQ or in-memory channels.

---

## 8.6 Node.js, Python and Go Options

| Ecosystem | Libraries | Notes |
|---|---|---|
| **Node.js** | NestJS microservices (transports for RabbitMQ, Kafka, NATS, Redis, MQTT), BullMQ (Redis job queues), `amqplib`, KafkaJS / `@confluentinc/kafka-javascript`, Moleculer | NestJS gives decorator-based handlers (`@EventPattern`, `@MessagePattern`) |
| **Python** | Celery (tasks over RabbitMQ/Redis), Dramatiq, FastStream (Kafka/RabbitMQ/NATS/Redis with Pydantic), `aio-pika`, `confluent-kafka`, Kombu | Celery is task-oriented, not an integration bus |
| **Go** | Watermill (pub/sub abstraction, CQRS component, many backends), NATS client, Sarama / franz-go (Kafka) | Watermill is the closest to a Go "service bus" |

```python
# FastStream example — RabbitMQ consumer and publisher with typed messages
from faststream import FastStream
from faststream.rabbit import RabbitBroker
from pydantic import BaseModel

class OrderPlaced(BaseModel):
    order_id: str
    total: float

broker = RabbitBroker("amqp://guest:guest@localhost:5672/")
app = FastStream(broker)

@broker.subscriber("billing.order-placed")
@broker.publisher("billing.invoice-created")
async def handle(event: OrderPlaced) -> dict:
    return {"order_id": event.order_id, "invoice": f"INV-{event.order_id}"}
```

---

## 8.7 In-Process Buses (Mediator Pattern)

An **in-process bus** dispatches messages to handlers inside the same process — no broker, no network.

| Library | Platform | Notes |
|---|---|---|
| **MediatR** | .NET | `IRequest`/`IRequestHandler` (commands/queries), `INotification` (events), pipeline behaviors. Moved to a commercial license in 2025 (v13+) |
| **Wolverine local queues** | .NET | Same API locally and over transports; durable local queues |
| **Spring `ApplicationEventPublisher`** | Java | `@EventListener`, `@TransactionalEventListener` (fire after commit) |
| **Guava EventBus** | Java | Simple annotation-based pub/sub (Guava docs now recommend alternatives) |
| **Node `EventEmitter`** | Node.js | Built-in event emitter; synchronous listeners |
| **NestJS CQRS** | Node.js | `CommandBus`, `QueryBus`, `EventBus` |

**When useful:** modular monoliths, separating command/query handlers (CQRS), cross-cutting pipelines (validation, logging, transactions). **Caveat:** an in-process bus gives *code* decoupling, not *runtime* decoupling — if the process crashes, in-flight messages are gone unless you add a durable outbox/local queue.

---

## 8.8 Comparison Table

| Framework | Language | License | Transports | Sagas | Outbox | Notable |
|---|---|---|---|---|---|---|
| **MassTransit** | .NET | v8 Apache 2.0, v9 commercial | RabbitMQ, ASB, SQS, ActiveMQ, Kafka, SQL, in-memory | ✅ state machines | ✅ | Huge community, test harness |
| **NServiceBus** | .NET | Commercial | RabbitMQ, ASB, SQS, SQL, PostgreSQL | ✅ | ✅ | Ops tooling (ServicePulse), support |
| **Wolverine** | .NET | MIT | RabbitMQ, ASB, SQS, Kafka, Pulsar, local | ✅ | ✅ | Mediator + bus, Marten integration |
| **Brighter** | .NET | MIT | RabbitMQ, Kafka, SQS, ASB, Redis… | ❌ (process managers by hand) | ✅ | Command processor |
| **Spring Cloud Stream** | Java | Apache 2.0 | RabbitMQ, Kafka, Pulsar, cloud binders | ❌ | Via Spring Modulith/Debezium | Functional binding model |
| **Axon** | Java | Apache 2.0 (Server: commercial tiers) | Axon Server, Kafka, AMQP | ✅ | N/A (event store) | CQRS/ES-first |
| **Apache Camel** | Java | Apache 2.0 | 300+ components | ✅ (Saga EIP) | Partial | EIP routing DSL |
| **Dapr** | Any (sidecar) | Apache 2.0 | 15+ brokers | Workflows building block | ✅ | Broker portability, CloudEvents |
| **Watermill** | Go | MIT | Kafka, RabbitMQ, NATS, SQL, Pub/Sub… | ❌ | ✅ (forwarder) | CQRS component |
| **NestJS microservices** | TS | MIT | RabbitMQ, Kafka, NATS, Redis, MQTT, gRPC | ❌ | ❌ | Decorator-based |

---

## 8.9 Testing Message-Based Code

| Level | Approach |
|---|---|
| **Unit** | Call the handler directly with a message; assert side effects and messages sent (frameworks provide fake contexts) |
| **Component** | In-memory transport / test harness (MassTransit `ITestHarness`, NServiceBus testing, Spring `TestChannelBinder`) |
| **Integration** | Real broker in **Testcontainers** (RabbitMQ, Kafka, LocalStack for SQS/SNS, Azure Service Bus emulator) |
| **Contract** | Pact message pacts or schema registry compatibility checks |
| **End-to-end** | Poll/await eventual outcomes with timeouts (`Awaitility`, polling helpers); avoid fixed sleeps |

```csharp
[Test]
public async Task Publishes_OrderSubmitted_when_SubmitOrder_is_consumed()
{
    await using var provider = new ServiceCollection()
        .AddMassTransitTestHarness(x => x.AddConsumer<SubmitOrderConsumer>())
        .AddSingleton<IOrderRepository, FakeOrderRepository>()
        .BuildServiceProvider(true);

    var harness = provider.GetRequiredService<ITestHarness>();
    await harness.Start();

    await harness.Bus.Publish(new SubmitOrder(Guid.NewGuid(), "c-1", 10m));

    Assert.That(await harness.Consumed.Any<SubmitOrder>());
    Assert.That(await harness.Published.Any<OrderSubmitted>());
}
```

---

## 8.10 Interview Talking Points

| Question | Strong answer |
|---|---|
| Why use MassTransit/NServiceBus instead of the RabbitMQ client? | They standardize topology, serialization, retries, error queues, outbox, sagas, tracing and testing, and abstract the transport so you can switch brokers. |
| Downside of these abstractions? | Extra dependency and licensing, hidden topology, and leaky abstractions — log-based transports (Kafka) don't behave like queues. |
| What is Dapr pub/sub? | A sidecar API for publish/subscribe using CloudEvents, where the broker is a pluggable component configured in YAML. |
| MediatR vs a message bus? | MediatR is an in-process mediator: code-level decoupling, no durability or cross-process delivery. A message bus crosses process boundaries through a durable broker. |
| How do you test message handlers? | Unit-test handlers directly, use in-memory harnesses for component tests, Testcontainers for broker integration, and contract tests for message schemas. |
