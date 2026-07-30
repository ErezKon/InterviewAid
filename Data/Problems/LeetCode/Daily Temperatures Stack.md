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
---
## Problem Description
Given an array of daily temperatures `T`, return an array `answer` such that `answer[i]` is the number of days you have to wait after day `i` to encounter a warmer temperature. If there is no future day with a higher temperature, set `answer[i] = 0`. Constraints: `1 <= T.length <= 10^5`, `30 <= T[i] <= 100`.

## Examples
- Input: `T = [73,74,75,71,69,72,76,73]`
  Output: `[1,1,4,2,1,1,0,0]` // each value shows days until a warmer temperature.
- Input: `T = [30,40,50,60]`
  Output: `[1,1,1,0]`

## Approach
Use a **Monotonic Decreasing Stack** to keep indices of temperatures that have not yet found a warmer day. Iterate through the array; while the current temperature is higher than the temperature at the stack's top, pop the index and compute the distance.

```text
FUNCTION DailyTemperatures(T):
    SET n ← LENGTH(T)
    SET answer ← ARRAY of zeros size n
    SET stack ← []  // stores indices with decreasing temperatures
    FOR i ← 0 TO n-1:
        WHILE stack NOT EMPTY AND T[i] > T[stack.TOP()]:
            SET idx ← stack.POP()
            SET answer[idx] ← i - idx
        stack.PUSH(i)
    RETURN answer
```

## Walkthrough
| Day (i) | Temp | Stack (indices) | Action |
|---|---|---|---|
|0|73|[]|push 0|
|1|74|[0]|74>73 → pop 0, answer[0]=1; push 1|
|2|75|[1]|75>74 → pop 1, answer[1]=1; push 2|
|3|71|[2]|push 3|
|4|69|[2,3]|push 4|
|5|72|[2,3,4]|72>69 → pop4, ans[4]=1; 72>71 → pop3, ans[3]=2; push5|
|6|76|[2,5]|76>72 → pop5, ans[5]=1; 76>75 → pop2, ans[2]=4; push6|
|7|73|[6]|push7 (no warmer later) |

## Complexity Analysis
- **Time:** O(n) – each index is pushed and popped at most once.
- **Space:** O(n) for the answer array and stack in the worst case.

## Follow-Up Questions
1. How would you modify the solution to return the actual future warmer temperature instead of the distance?
2. Can you solve the problem using a binary search tree for a different time‑space trade‑off?
3. How does the solution change if temperatures are streamed in real time?

## Key Takeaway
A monotonic decreasing stack efficiently finds the next greater element for each position in linear time.
