# 2532. Time to Cross a Bridge

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/time-to-cross-a-bridge](https://leetcode.com/problems/time-to-cross-a-bridge)
**Companies:** Linkedin

---

## Problem Description
A group of `n` people must cross a bridge at night. Each person `i` takes `times[i]` minutes to cross alone. At most two people can cross together, moving at the slower person's speed. A torch is required for any crossing and must be carried back and forth. Compute the minimum total time for all to cross.

## Examples
| times | Output | Explanation |
|-------|--------|-------------|
| `[1,2,5,10]` | `17` | Optimal sequence: 1+2 cross (2), 1 returns (1), 5+10 cross (10), 2 returns (2), 1+2 cross (2). Total = 17. |
| `[1,2,3,4,5]` | `16` | One optimal strategy uses the two fastest to shuttle the slowest. |

## Approach
Two classic strategies for the fastest‑slowest problem:
1. **Strategy A** – Send the two fastest across, fastest returns, two slowest cross, second fastest returns.
2. **Strategy B** – Send fastest with slowest, fastest returns, fastest with second slowest, fastest returns.
Choose the cheaper of the two at each step until ≤3 people remain, then handle the base cases directly.

```text
FUNCTION minCrossTime(times):
    SORT times ASCENDING
    SET total ← 0
    WHILE LENGTH(times) > 3:
        SET a ← times[0]   // fastest
        SET b ← times[1]   // second fastest
        SET y ← times[-2]  // second slowest
        SET z ← times[-1]  // slowest
        // cost of two possible patterns
        SET costA ← a + 2*b + z   // a+b cross, a back, y+z cross, b back
        SET costB ← 2*a + y + z   // a+z cross, a back, a+y cross, a back
        SET total ← total + MIN(costA, costB)
        REMOVE last two elements from times  // y and z are now crossed
    // handle remaining 1‑3 people
    IF LENGTH(times) = 3:
        SET total ← total + times[0] + times[1] + times[2]
    ELSE IF LENGTH(times) = 2:
        SET total ← total + times[1]
    ELSE IF LENGTH(times) = 1:
        SET total ← total + times[0]
    RETURN total
```

## Walkthrough
For `[1,2,5,10]` (sorted):
| Step | Action | Cost added |
|------|--------|------------|
| 1 | Strategy A (cheaper) → 1+2 cross (2), 1 back (1), 5+10 cross (10), 2 back (2) | 15 |
| 2 | Remaining `[1,2]` → cross together (2) | 2 |
Total = 17 minutes.

## Complexity Analysis
*Time*: `O(n log n)` for sorting; the loop is linear.
*Space*: `O(1)` beyond the input array.

## Follow‑Up Questions
1. How would the solution change if more than two people could cross together?
2. What if each crossing incurs a fixed overhead time in addition to the slowest person's time?
3. Can you output the exact sequence of moves achieving the minimum time?

## Key Takeaway
Sorting the times and repeatedly applying the cheaper of two shuttle patterns yields the optimal bridge‑crossing schedule.
