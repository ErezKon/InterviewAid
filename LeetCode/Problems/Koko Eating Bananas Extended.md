# 875. Koko Eating Bananas — Binary Search on Answer Pattern

See also: [Koko Eating Bananas.md](Koko%20Eating%20Bananas.md) for the full solution.

**Companies:** Accenture, Adobe, Amazon, Atlassian, Autodesk, Bloomberg, Citadel, De Shaw, Doordash, Flipkart, Goldman Sachs, Google, Hashedin, Ibm, Infosys, Josh Technology, Linkedin, Meta, Microsoft, Netflix, Oracle, Oyo, Palo Alto Networks, Paypal, Phonepe, Quantiphi, Quince, Ripple, Salesforce, Snapchat, Swiggy, Tcs, Tiktok, Trexquant, Turing, Uber, Vmware, Zepto
---

## The "Binary Search on Answer" Pattern

Many problems ask: "Find the minimum/maximum value of X such that some condition holds." Binary search on X.

| Problem | Search Space | Condition |
|---------|-------------|-----------|
| Koko Eating Bananas (#875) | eating speed [1, max(piles)] | can finish in h hours |
| Capacity to Ship (#1011) | capacity [max(w), sum(w)] | can ship in d days |
| Split Array Largest Sum (#410) | max sum [max, total] | can split into m parts |
| Minimize Max Distance (#774) | distance [0, max gap] | can place k stations |
| Magnetic Force (#1552) | min distance [1, range] | can place m balls |

### Template

```
FUNCTION binarySearchOnAnswer():
    lo = minimum possible answer
    hi = maximum possible answer

    WHILE lo < hi:
        mid = (lo + hi) / 2
        IF feasible(mid):
            hi = mid         // try smaller
        ELSE:
            lo = mid + 1     // need larger

    RETURN lo
```

---

## Key Takeaway

> When the answer is monotonic (if X works, X+1 also works), binary search on the answer. The hard part is implementing `feasible()`.
