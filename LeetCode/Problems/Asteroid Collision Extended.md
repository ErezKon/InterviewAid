# 735. Asteroid Collision — Stack Pattern

See also: [Asteroid Collision.md](Asteroid%20Collision.md)

**Companies:** Accolite, Amazon, Apple, Bloomberg, De Shaw, Doordash, Dream11, Epam Systems, Flipkart, Goldman Sachs, Google, Ibm, Imc, Juspay, Meesho, Meta, Microsoft, Myntra, Nuro, Nvidia, Openai, Oracle, Paypal, Phonepe, Qualtrics, Roku, Salesforce, Servicenow, Sofi, Sprinklr, Tiktok, Uber, Walmart Labs, Zoho
---

## Similar Stack Collision/Removal Problems

| Problem | Pattern |
|---------|---------|
| Asteroid Collision (#735) | Stack with conditional popping |
| Remove All Adjacent Duplicates (#1047) | Stack, pop if top == current |
| Remove All Adjacent Duplicates II (#1209) | Stack of (char, count) |
| Removing Stars From a String (#2390) | Stack, pop on '*' |
| Validate Stack Sequences (#946) | Simulate push/pop |

### General Template

```
stack = []
FOR item IN sequence:
    WHILE stack AND shouldPop(stack.TOP(), item):
        stack.POP()
        // possibly modify item
    IF shouldPush(item):
        stack.PUSH(item)
```
