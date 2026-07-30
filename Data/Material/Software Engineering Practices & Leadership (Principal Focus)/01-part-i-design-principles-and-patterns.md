# Part I — Design Principles & Patterns

## Table of Contents

- [1.1 Core Design Principles](#11-core-design-principles)
  - [Relationship Between the Principles](#relationship-between-the-principles)
  - [1.1.1 SOLID Principles](#111-solid-principles)
    - [Deep Dive: Dependency Inversion](#deep-dive-dependency-inversion)
    - [Code Example — SRP + DIP in Practice](#code-example-srp-dip-in-practice)
  - [1.1.2 DRY — Don't Repeat Yourself](#112-dry-dont-repeat-yourself)
  - [1.1.3 KISS — Keep It Simple, Stupid](#113-kiss-keep-it-simple-stupid)
  - [1.1.4 YAGNI — You Ain't Gonna Need It](#114-yagni-you-aint-gonna-need-it)
- [1.2 Gang of Four (GoF) Design Patterns](#12-gang-of-four-gof-design-patterns)
  - [GoF Pattern Families Overview](#gof-pattern-families-overview)
  - [1.2.1 Factory Method (Creational)](#121-factory-method-creational)
  - [1.2.2 Strategy (Behavioral)](#122-strategy-behavioral)
  - [1.2.3 Observer (Behavioral)](#123-observer-behavioral)
  - [1.2.4 Adapter (Structural)](#124-adapter-structural)
  - [1.2.5 Decorator (Structural)](#125-decorator-structural)
  - [GoF Patterns — Quick-Reference Selection Guide](#gof-patterns-quick-reference-selection-guide)
- [1.3 Domain-Driven Design (DDD)](#13-domain-driven-design-ddd)
  - [DDD Strategic & Tactical Landscape](#ddd-strategic-and-tactical-landscape)
  - [1.3.1 Ubiquitous Language](#131-ubiquitous-language)
  - [1.3.2 Bounded Contexts](#132-bounded-contexts)
    - [Context Mapping Patterns](#context-mapping-patterns)
  - [1.3.3 Aggregates](#133-aggregates)
  - [1.3.4 Value Objects](#134-value-objects)
  - [DDD — Complete Layered Architecture](#ddd-complete-layered-architecture)


## 1.1 Core Design Principles

These four complementary heuristics form a decision-making compass for every line of code, every module boundary, and every architectural choice.

### Relationship Between the Principles

```mermaid
graph LR
    A["KISS<br/><i>Keep It Simple</i>"] -->|simplicity reveals| B["DRY<br/><i>Don't Repeat Yourself</i>"]
    A -->|simplicity enforces| C["YAGNI<br/><i>You Ain't Gonna Need It</i>"]
    B -->|single source of truth supports| D["SOLID<br/><i>5 OO Principles</i>"]
    C -->|eliminates premature abstraction<br/>keeping room for| D
    D -->|well-factored code is| A

    style A fill:#4CAF50,color:#fff,stroke:#388E3C
    style B fill:#2196F3,color:#fff,stroke:#1565C0
    style C fill:#FF9800,color:#fff,stroke:#EF6C00
    style D fill:#9C27B0,color:#fff,stroke:#6A1B9A
```

---

### 1.1.1 SOLID Principles

| # | Principle | Formal Statement | Plain-Language Rule | Violation Smell |
|---|-----------|-----------------|---------------------|-----------------|
| **S** | Single Responsibility | A class should have only one reason to change. | One job per module. | God classes, "Util" classes that grow forever. |
| **O** | Open/Closed | Software entities should be open for extension but closed for modification. | Add behavior without editing existing code. | Massive `switch/case` blocks, rewriting core logic for each new variant. |
| **L** | Liskov Substitution | Subtypes must be substitutable for their base types without altering correctness. | Subclasses must honor the contract of their parent. | Overridden methods that throw `NotSupportedException`. |
| **I** | Interface Segregation | No client should be forced to depend on methods it does not use. | Prefer many small interfaces over one fat interface. | Interfaces with 20+ methods where implementors stub half of them. |
| **D** | Dependency Inversion | High-level modules should not depend on low-level modules; both should depend on abstractions. | Depend on contracts, not concrete implementations. | Direct `new` of infrastructure classes (DB drivers, HTTP clients) deep inside business logic. |

#### Deep Dive: Dependency Inversion

```mermaid
graph TB
    subgraph "❌ Without DIP"
        A1["OrderService<br/><i>(high-level)</i>"] -->|directly depends on| B1["MySQLOrderRepository<br/><i>(low-level)</i>"]
    end

    subgraph "✅ With DIP"
        A2["OrderService<br/><i>(high-level)</i>"] -->|depends on| I2["«interface»<br/>OrderRepository"]
        B2["MySQLOrderRepository<br/><i>(low-level)</i>"] -->|implements| I2
        C2["DynamoDBOrderRepository<br/><i>(low-level)</i>"] -->|implements| I2
    end

    style I2 fill:#E1BEE7,stroke:#9C27B0,color:#000000
    style A2 fill:#C8E6C9,stroke:#4CAF50,color:#000000
    style B2 fill:#BBDEFB,stroke:#2196F3,color:#000000
    style C2 fill:#BBDEFB,stroke:#2196F3,color:#000000
    style A1 fill:#C8E6C9,stroke:#4CAF50,color:#000000
    style B1 fill:#BBDEFB,stroke:#2196F3,color:#000000
```

> **Principal-level insight:** DIP is the architectural backbone behind Hexagonal Architecture (Ports & Adapters). The "ports" _are_ the abstractions; the "adapters" _are_ the swappable implementations. When you enforce DIP consistently, you naturally arrive at testable, infrastructure-agnostic business logic.

#### Code Example — SRP + DIP in Practice

```python
# ─── Abstraction (Port) ───────────────────────────────
from abc import ABC, abstractmethod

class PaymentGateway(ABC):
    """Contract — high-level policy depends on this."""
    @abstractmethod
    def charge(self, amount_cents: int, token: str) -> str:
        """Returns a transaction ID."""
        ...

# ─── Low-level adapter ────────────────────────────────
class StripeGateway(PaymentGateway):
    def charge(self, amount_cents: int, token: str) -> str:
        # Stripe SDK call …
        return stripe.Charge.create(amount=amount_cents, source=token).id

# ─── High-level policy (SRP: only orchestrates payment) ─
class CheckoutService:
    def __init__(self, gateway: PaymentGateway):   # DIP: depends on abstraction
        self._gateway = gateway

    def complete(self, cart, payment_token: str) -> str:
        total = cart.total_cents()
        return self._gateway.charge(total, payment_token)
```

---

### 1.1.2 DRY — Don't Repeat Yourself

> *"Every piece of knowledge must have a single, unambiguous, authoritative representation within a system."*
> — Andy Hunt & Dave Thomas, *The Pragmatic Programmer*

| Concept | Description |
|---------|-------------|
| **What it IS** | Eliminating _knowledge_ duplication: business rules, schema definitions, configuration constants. |
| **What it is NOT** | Blindly merging two code blocks that _look_ similar but represent different domain concepts. |
| **Danger of over-applying** | Premature DRY leads to **wrong abstractions** that couple unrelated concerns (see "AHA Programming — Avoid Hasty Abstractions"). |

**Rule of Three:** Consider extracting only after you see the **third** instance of genuine duplication. The first two occurrences may diverge.

---

### 1.1.3 KISS — Keep It Simple, Stupid

| Guideline | Example |
|-----------|---------|
| Prefer explicit over clever. | A straightforward `for` loop over a chained ternary one-liner. |
| Choose boring technology for solved problems. | PostgreSQL over a brand-new distributed SQL engine — unless you've proven the need. |
| Minimize moving parts. | Synchronous request-response before event-driven choreography, until latency or scale demands otherwise. |

> **Principal-level checkpoint:** Before adding a framework, library, or architectural layer, ask: *"What is the simplest thing that could possibly work, and what evidence do I have that it won't?"*

---

### 1.1.4 YAGNI — You Ain't Gonna Need It

YAGNI prevents **speculative generality** — building extension points, generic factories, or configuration-driven behavior for requirements that _might_ arrive someday.

```mermaid
graph TD
    R["New Requirement<br/>Arrives"] --> Q{"Do we need<br/>this TODAY?"}
    Q -->|Yes| B["Build the simplest<br/>correct solution"]
    Q -->|No| W["Don't build it.<br/>Add a TODO or<br/>backlog item."]
    B --> V["Validate with tests<br/>& review"]
    W --> M["Monitor: does the need<br/>actually materialise?"]
    M -->|Yes, it did| B
    M -->|No| D["Saved wasted effort ✔"]

    style R fill:#FFF9C4,stroke:#F9A825,color:#000000
    style D fill:#C8E6C9,stroke:#388E3C,color:#000000
```

**Cost of violating YAGNI:**

| Hidden Cost | Impact |
|------------|--------|
| Extra code to maintain | Increased surface area for bugs. |
| Cognitive overhead | New team members must understand unused abstractions. |
| Delayed delivery | Time spent building unused features is time not spent on real requirements. |
| Wrong abstractions | Premature generalization often guesses the wrong axis of change. |

---

## 1.2 Gang of Four (GoF) Design Patterns

The 23 GoF patterns (1994) are grouped into three families. Below we deep-dive into the six most commonly referenced at the principal level.

### GoF Pattern Families Overview

```mermaid
graph TB
    GoF["Gang of Four<br/>Design Patterns"]
    GoF --> C["Creational<br/><i>Object creation</i>"]
    GoF --> S["Structural<br/><i>Object composition</i>"]
    GoF --> B["Behavioral<br/><i>Object interaction</i>"]

    C --> C1["Factory Method"]
    C --> C2["Abstract Factory"]
    C --> C3["Builder"]
    C --> C4["Singleton"]
    C --> C5["Prototype"]

    S --> S1["Adapter"]
    S --> S2["Decorator"]
    S --> S3["Facade"]
    S --> S4["Composite"]
    S --> S5["Bridge"]
    S --> S6["Proxy"]
    S --> S7["Flyweight"]

    B --> B1["Strategy"]
    B --> B2["Observer"]
    B --> B3["Command"]
    B --> B4["State"]
    B --> B5["Template Method"]
    B --> B6["Iterator"]
    B --> B7["Mediator"]
    B --> B8["Chain of Resp."]
    B --> B9["Visitor"]
    B --> B10["Memento"]
    B --> B11["Interpreter"]

    style GoF fill:#9C27B0,color:#fff
    style C fill:#4CAF50,color:#fff
    style S fill:#2196F3,color:#fff
    style B fill:#FF9800,color:#fff

    style C1 fill:#C8E6C9
    style C2 fill:#C8E6C9
    style C3 fill:#C8E6C9
    style C4 fill:#C8E6C9
    style C5 fill:#C8E6C9

    style S1 fill:#BBDEFB
    style S2 fill:#BBDEFB
    style S3 fill:#BBDEFB
    style S4 fill:#BBDEFB
    style S5 fill:#BBDEFB
    style S6 fill:#BBDEFB
    style S7 fill:#BBDEFB

    style B1 fill:#FFE0B2
    style B2 fill:#FFE0B2
    style B3 fill:#FFE0B2
    style B4 fill:#FFE0B2
    style B5 fill:#FFE0B2
    style B6 fill:#FFE0B2
    style B7 fill:#FFE0B2
    style B8 fill:#FFE0B2
    style B9 fill:#FFE0B2
    style B10 fill:#FFE0B2
    style B11 fill:#FFE0B2
```

---

### 1.2.1 Factory Method (Creational)

**Intent:** Define an interface for creating an object, but let subclasses decide which class to instantiate.

**When to use:** You need to decouple creation logic from usage, especially when the concrete type depends on runtime context (config, environment, user input).

```mermaid
classDiagram
    class Notification {
        <<interface>>
        +send(recipient, message)
    }
    class EmailNotification {
        +send(recipient, message)
    }
    class SMSNotification {
        +send(recipient, message)
    }
    class PushNotification {
        +send(recipient, message)
    }
    class NotificationFactory {
        +create(channel): Notification
    }

    Notification <|.. EmailNotification
    Notification <|.. SMSNotification
    Notification <|.. PushNotification
    NotificationFactory ..> Notification : creates
```

```python
class NotificationFactory:
    _registry: dict[str, type[Notification]] = {
        "email": EmailNotification,
        "sms":   SMSNotification,
        "push":  PushNotification,
    }

    @classmethod
    def create(cls, channel: str) -> Notification:
        klass = cls._registry.get(channel)
        if klass is None:
            raise ValueError(f"Unknown channel: {channel}")
        return klass()
```

> **Tip:** Combine with a **registry pattern** (dict/map lookup) to achieve Open/Closed — adding a new channel means registering a new class, not editing `if/else` chains.

---

### 1.2.2 Strategy (Behavioral)

**Intent:** Define a family of algorithms, encapsulate each one, and make them interchangeable at runtime.

**When to use:** You have multiple ways to perform an operation (pricing, sorting, compression) and want to select the approach without conditional branching.

```mermaid
classDiagram
    class PricingStrategy {
        <<interface>>
        +calculate(order): Money
    }
    class RegularPricing {
        +calculate(order): Money
    }
    class PremiumPricing {
        +calculate(order): Money
    }
    class HolidaySalePricing {
        +calculate(order): Money
    }
    class CheckoutService {
        -strategy: PricingStrategy
        +checkout(order)
    }

    PricingStrategy <|.. RegularPricing
    PricingStrategy <|.. PremiumPricing
    PricingStrategy <|.. HolidaySalePricing
    CheckoutService o-- PricingStrategy : uses
```

**SOLID connection:** Strategy is a direct embodiment of **OCP** (new algorithms without modifying `CheckoutService`) and **DIP** (depending on the `PricingStrategy` abstraction).

---

### 1.2.3 Observer (Behavioral)

**Intent:** Define a one-to-many dependency so that when one object changes state, all dependents are notified and updated automatically.

```mermaid
sequenceDiagram
    participant Subject as OrderAggregate<br/>(Subject)
    participant O1 as InventoryService<br/>(Observer)
    participant O2 as NotificationService<br/>(Observer)
    participant O3 as AnalyticsService<br/>(Observer)

    Subject->>Subject: state changes → OrderPlaced
    Subject->>O1: notify(OrderPlaced)
    Subject->>O2: notify(OrderPlaced)
    Subject->>O3: notify(OrderPlaced)
    O1-->>O1: reserve stock
    O2-->>O2: send confirmation email
    O3-->>O3: log conversion event
```

**Modern equivalents:**

| In-Process | Distributed |
|-----------|-------------|
| Event emitters, Reactive Streams (`RxJava`, `Project Reactor`) | Message brokers (Kafka topics, SNS/SQS fan-out), webhooks |

> **Principal-level caution:** In-process observer chains run synchronously by default — a slow observer blocks the publisher. Decide early whether notification should be sync, async-in-process, or fully decoupled via a message bus.

---

### 1.2.4 Adapter (Structural)

**Intent:** Convert the interface of a class into another interface that clients expect. Lets classes work together that couldn't otherwise because of incompatible interfaces.

```mermaid
classDiagram
    class PaymentGateway {
        <<interface>>
        +charge(amount, token): TxnId
    }
    class LegacyPayPalSDK {
        +makePayment(dollars, cents, ref): Response
    }
    class PayPalAdapter {
        -legacySdk: LegacyPayPalSDK
        +charge(amount, token): TxnId
    }

    PaymentGateway <|.. PayPalAdapter
    PayPalAdapter --> LegacyPayPalSDK : wraps
```

**Real-world scenario:** You're migrating from a legacy payment SDK. Rather than rewriting all call sites, you wrap the old SDK behind the `PaymentGateway` interface your codebase already uses. Later, the adapter is swapped for a native implementation — zero changes to callers.

---

### 1.2.5 Decorator (Structural)

**Intent:** Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.

```mermaid
classDiagram
    class DataSource {
        <<interface>>
        +read(): bytes
        +write(data: bytes)
    }
    class FileDataSource {
        +read(): bytes
        +write(data: bytes)
    }
    class EncryptionDecorator {
        -wrapped: DataSource
        +read(): bytes
        +write(data: bytes)
    }
    class CompressionDecorator {
        -wrapped: DataSource
        +read(): bytes
        +write(data: bytes)
    }

    DataSource <|.. FileDataSource
    DataSource <|.. EncryptionDecorator
    DataSource <|.. CompressionDecorator
    EncryptionDecorator o-- DataSource : wraps
    CompressionDecorator o-- DataSource : wraps
```

```python
# Composable at runtime:
source = CompressionDecorator(
            EncryptionDecorator(
                FileDataSource("secrets.dat")
            )
         )
source.write(b"sensitive payload")
# write path: compress → encrypt → file
# read  path: file → decrypt → decompress
```

**Key insight:** Each decorator satisfies the same interface as the component it wraps — they are stackable like layers. This is the same idea behind middleware pipelines (Express.js, ASP.NET, Django middleware).

---

### GoF Patterns — Quick-Reference Selection Guide

| Problem Space | Consider Pattern | Why |
|--------------|-----------------|-----|
| "I need to create objects without specifying exact classes." | **Factory / Abstract Factory** | Decouples creation from use. |
| "I have multiple interchangeable algorithms." | **Strategy** | Eliminates conditional branching. |
| "Multiple subsystems need to react to a state change." | **Observer** | Decouples publisher from subscribers. |
| "I must integrate an incompatible third-party API." | **Adapter** | Wraps foreign interface behind your contract. |
| "I want to layer on cross-cutting behavior (logging, auth, caching)." | **Decorator** | Adds behavior without modifying core class. |
| "I need to simplify interaction with a complex subsystem." | **Facade** | Provides a unified, simplified interface. |
| "An object's behavior should change with its internal state." | **State** | Replaces state-based `if/else` with polymorphism. |

---

## 1.3 Domain-Driven Design (DDD)

DDD is a philosophy for tackling complex business domains by keeping the **model** at the center of all design conversations.

### DDD Strategic & Tactical Landscape

```mermaid
graph TB
    DDD["Domain-Driven Design"]

    DDD --> Strategic["Strategic Design<br/><i>(system-level)</i>"]
    DDD --> Tactical["Tactical Design<br/><i>(code-level)</i>"]

    Strategic --> BC["Bounded Contexts"]
    Strategic --> UL["Ubiquitous Language"]
    Strategic --> CM["Context Mapping"]
    Strategic --> SD["Sub-domains<br/>(Core / Supporting / Generic)"]

    Tactical --> Agg["Aggregates"]
    Tactical --> Ent["Entities"]
    Tactical --> VO["Value Objects"]
    Tactical --> DE["Domain Events"]
    Tactical --> Repo["Repositories"]
    Tactical --> DS["Domain Services"]
    Tactical --> AppS["Application Services"]

    style DDD fill:#9C27B0,color:#fff
    style Strategic fill:#1565C0,color:#fff
    style Tactical fill:#2E7D32,color:#fff
```

---

### 1.3.1 Ubiquitous Language

> The single most important practice in DDD.

Ubiquitous Language is a **shared vocabulary** between developers, product managers, and domain experts that is reflected _directly_ in the code (class names, method names, event names).

| Practice | Anti-Pattern |
|----------|-------------|
| The code says `Policy`, `Claim`, `Adjudication` — the same terms the underwriter uses. | The code says `DataProcessor`, `Item`, `handleStuff`. |
| A new domain concept triggers a naming discussion with domain experts. | Developers invent names in isolation; business stakeholders can't read the code. |

**Enforcement techniques:**
- Glossaries maintained in the repo (`docs/ubiquitous-language.md`).
- Linting rules that flag generic names.
- Code review checklists that require domain-appropriate naming.

---

### 1.3.2 Bounded Contexts

A Bounded Context is the **explicit boundary** within which a particular domain model is defined and applicable. The same real-world concept (e.g., "Customer") may have different representations in different contexts.

```mermaid
graph TB
    subgraph "Sales Context"
        SC_Customer["Customer<br/>- name<br/>- email<br/>- preferredContact"]
        SC_Order["Order<br/>- lineItems<br/>- discountCode"]
    end

    subgraph "Shipping Context"
        SH_Customer["Customer<br/>- shippingAddress<br/>- deliveryPreferences"]
        SH_Shipment["Shipment<br/>- trackingNumber<br/>- carrier"]
    end

    subgraph "Billing Context"
        BI_Customer["Customer<br/>- billingAddress<br/>- paymentMethods<br/>- taxId"]
        BI_Invoice["Invoice<br/>- amountDue<br/>- dueDate"]
    end

    SC_Customer -.->|"Anti-Corruption Layer<br/> or shared ID"| SH_Customer
    SC_Customer -.->|"Anti-Corruption Layer<br/> or shared ID"| BI_Customer

    style SC_Customer fill:#C8E6C9,stroke:#388E3C
    style SH_Customer fill:#BBDEFB,stroke:#1565C0
    style BI_Customer fill:#FFE0B2,stroke:#EF6C00
```

> **Key rule:** "Customer" in Sales is _not the same model_ as "Customer" in Billing. Attempting to share a single `Customer` class across all contexts leads to a tangled, ever-growing God Object.

#### Context Mapping Patterns

| Pattern | Description | When to Use |
|---------|-------------|-------------|
| **Shared Kernel** | Two contexts share a small, co-owned subset of the model. | Tightly coupled teams willing to co-evolve. |
| **Anti-Corruption Layer (ACL)** | A translation layer that insulates your context from a foreign model. | Integrating with legacy or third-party systems. |
| **Customer / Supplier** | Upstream context serves the downstream context. | Clear producer/consumer relationship. |
| **Conformist** | Downstream adopts the upstream model as-is. | When the upstream team won't accommodate changes. |
| **Open Host Service + Published Language** | Upstream offers a well-defined API/protocol for all consumers. | Public APIs, platform services. |
| **Separate Ways** | No integration — each context solves the problem independently. | When integration cost outweighs benefit. |

---

### 1.3.3 Aggregates

An **Aggregate** is a cluster of domain objects treated as a single unit for data changes. It has:

1. An **Aggregate Root** — the only entry point for external access.
2. **Consistency boundary** — all invariants within the aggregate are enforced transactionally.
3. **Identity** — the root carries a unique identity; internal entities may have local identity.

```mermaid
graph TB
    subgraph "Order Aggregate"
        OR["Order<br/><i>(Aggregate Root)</i><br/>- orderId<br/>- status<br/>- placedAt"]
        LI1["OrderLineItem<br/>- productId<br/>- quantity<br/>- unitPrice"]
        LI2["OrderLineItem<br/>- productId<br/>- quantity<br/>- unitPrice"]
        SA["ShippingAddress<br/><i>(Value Object)</i><br/>- street, city, zip"]
    end

    OR --> LI1
    OR --> LI2
    OR --> SA

    EXT["External Service"] -->|"always goes through root"| OR
    EXT -.->|"❌ never directly"| LI1

    style OR fill:#E1BEE7,stroke:#9C27B0,stroke-width:3px,color:#000000
    style LI1 fill:#F3E5F5,stroke:#9C27B0,color:#000000
    style LI2 fill:#F3E5F5,stroke:#9C27B0,color:#000000
    style SA fill:#FFF9C4,stroke:#F9A825,color:#000000
    style EXT fill:#ECEFF1,stroke:#607D8B,color:#000000
```

**Aggregate Design Rules (Vaughn Vernon):**

| Rule | Rationale |
|------|-----------|
| Design small aggregates. | Large aggregates create contention, merge conflicts, and transaction failures. |
| Reference other aggregates by identity only. | Prevents object-graph loading and cross-aggregate coupling. |
| Use eventual consistency between aggregates. | Only the _aggregate itself_ must be immediately consistent; inter-aggregate rules can be async. |
| Update one aggregate per transaction. | Simplifies concurrency; enables scaling. |

---

### 1.3.4 Value Objects

A **Value Object** is defined by its _attributes_, not by an identity. Two Value Objects with the same attributes are equal.

```python
from dataclasses import dataclass

@dataclass(frozen=True)   # immutable
class Money:
    amount: int            # in minor units (cents)
    currency: str          # ISO 4217

    def add(self, other: "Money") -> "Money":
        if self.currency != other.currency:
            raise ValueError("Cannot add different currencies")
        return Money(self.amount + other.amount, self.currency)

# Two $10 USD values are equal regardless of where they were created
assert Money(1000, "USD") == Money(1000, "USD")
```

| Value Object Examples | Entity Examples (has identity) |
|----------------------|-------------------------------|
| Money, EmailAddress, DateRange, GPS Coordinates, Color | User, Order, Invoice, Product |

**Benefits:** Immutability eliminates side effects, makes code thread-safe, and simplifies testing.

---

### DDD — Complete Layered Architecture

```mermaid
graph TB
    subgraph "Presentation / API Layer"
        API["REST Controllers<br/>GraphQL Resolvers<br/>gRPC Handlers"]
    end

    subgraph "Application Layer"
        AS["Application Services<br/><i>Use-case orchestration</i><br/>Commands & Queries"]
    end

    subgraph "Domain Layer"
        DM["Aggregates<br/>Entities<br/>Value Objects<br/>Domain Events<br/>Domain Services<br/>Repository Interfaces"]
    end

    subgraph "Infrastructure Layer"
        INF["Repository Implementations<br/>ORM / DB Clients<br/>Message Brokers<br/>External API Adapters"]
    end

    API --> AS
    AS --> DM
    INF --> DM

    style API fill:#BBDEFB,stroke:#1565C0,color:#000000
    style AS fill:#C8E6C9,stroke:#388E3C,color:#000000
    style DM fill:#E1BEE7,stroke:#9C27B0,stroke-width:3px,color:#000000
    style INF fill:#FFE0B2,stroke:#EF6C00,color:#000000
```

> **Dependency Rule:** All arrows point _toward_ the Domain Layer. Infrastructure _implements_ domain interfaces (Dependency Inversion). The domain layer has **zero** dependencies on frameworks, databases, or HTTP.

---

