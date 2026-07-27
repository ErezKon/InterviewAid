# 394. Decode String — Nested Stack Pattern

See also: [Decode String.md](Decode%20String.md)

**Companies:** Activision, Adobe, Agoda, Amazon, Apple, Arista Networks, Bloomberg, Bytedance, Cisco, Compass, Coupang, Cyntexa, Ebay, Flexport, Geico, Goldman Sachs, Google, Hashedin, Huawei, Meta, Microsoft, Moloco, Nutanix, Nvidia, Oracle, Ozon, Palo Alto Networks, Phonepe, Razorpay, Roku, Salesforce, Tencent, Tiktok, Tinkoff, Walmart Labs, Wix, Yahoo, Yelp, Zoho, Zopsmart
---

## Similar Nested Bracket Problems

| Problem | Stack Stores |
|---------|-------------|
| Decode String (#394) | (prevString, count) |
| Basic Calculator (#224) | (result, sign) |
| Number of Atoms (#726) | (prevMap, multiplier) |
| Brace Expansion (#1087) | options at each level |
| Nested List Weight Sum (#339) | depth level |

### Pattern: Push context on `[`, pop and merge on `]`

```
FOR char IN s:
    IF char == '[':
        stack.PUSH(currentContext)
        resetContext()
    ELSE IF char == ']':
        prevContext = stack.POP()
        mergeContexts(prevContext, currentContext)
    ELSE:
        updateContext(char)
```
