# Key Takeaways & Further Reading

## Table of Contents

  - [Key Takeaways](#key-takeaways)
  - [Further Reading](#further-reading)


### Key Takeaways

| Area | Core Lesson |
|---|---|
| **Docker** | Package your app with its environment. Use multi-stage builds. Images should be small, secure, and reproducible. |
| **Kubernetes** | Think declaratively: describe *desired state*, let K8s handle the rest. Master the Pod → Deployment → Service → Ingress chain. |
| **IaC** | Infrastructure should be code-reviewed, version-controlled, and reproducible. Never click-ops in production. |
| **Deployment Strategies** | Match your strategy to your risk tolerance. Combine approaches. Always have a rollback plan. |
| **Observability** | Metrics for alerting, Logs for debugging, Traces for understanding flow. Correlate all three via trace IDs. |
| **SLIs/SLOs/SLAs** | Measure what users experience (SLIs), set targets (SLOs), use error budgets to balance velocity and reliability. |

### Further Reading

| Topic | Resource |
|---|---|
| Kubernetes | [Kubernetes Official Documentation](https://kubernetes.io/docs/) |
| Terraform | [Terraform: Up & Running (Yevgeniy Brikman)](https://www.terraformupandrunning.com/) |
| Observability | [Observability Engineering (Charity Majors et al.)](https://www.oreilly.com/library/view/observability-engineering/9781492076438/) |
| SRE & SLOs | [Google SRE Book (free online)](https://sre.google/sre-book/table-of-contents/) |
| OpenTelemetry | [OpenTelemetry Documentation](https://opentelemetry.io/docs/) |
| Feature Flags | [Martin Fowler — Feature Toggles](https://martinfowler.com/articles/feature-toggles.html) |
| Deployment Strategies | [Kubernetes Deployment Strategies (Container Solutions)](https://blog.container-solutions.com/kubernetes-deployment-strategies) |

---

> *"Observability is not about collecting data. It's about being able to ask arbitrary questions of your systems — questions you couldn't have predicted in advance."* — Charity Majors

---
