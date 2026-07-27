# 739. Daily Temperatures (Extended Notes)

**Companies:** Accenture, Agoda, Airwallex, Amazon, Anduril, Bloomberg, Browserstack, Goldman Sachs, Google, Grab, Hashedin, Infosys, Intuit, Josh Technology, Meta, Microsoft, Morgan Stanley, Nvidia, Okta, Oracle, Sap, Servicenow, Swiggy, Tcs, Tekion, Tiktok, Verizon, Visa, Walmart Labs, Yandex, Zoho
See also: [Daily Temperatures.md](Daily%20Temperatures.md) for the full solution.

The **monotonic stack** pattern used here applies to many problems:
- Next Greater Element I, II, III (#496, #503, #556)
- Largest Rectangle in Histogram (#84)
- Stock Span Problem (#901)
- Sum of Subarray Minimums (#907)

### Pattern Template

```
stack = []
result = array of default values

FOR i ← 0 TO n-1:
    WHILE stack not empty AND condition(nums[stack.TOP()], nums[i]):
        idx = stack.POP()
        result[idx] = compute(idx, i)
    stack.PUSH(i)
```

The condition determines monotonicity: increasing stack finds "next greater," decreasing stack finds "next smaller."
