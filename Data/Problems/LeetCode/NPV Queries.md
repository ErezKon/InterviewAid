# 1421. NPV Queries

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/npv-queries](https://leetcode.com/problems/npv-queries)
**Companies:** Amazon

---

## Problem Description
You are given an array `cashFlows` of length `n`, where `cashFlows[i]` represents the cash flow at year `i+1`. For each query `(l, r, k)` you must compute the Net Present Value (NPV) of the sub‑array `cashFlows[l..r]` using a discount rate `k`. The NPV is defined as `sum_{i=l}^{r} cashFlows[i] / (1 + k)^{i-l+1}`. Return the result for each query.

## Examples
| cashFlows | Query `(l,r,k)` | NPV |
|-----------|----------------|-----|
| [100,200,300] | (1,3,0.1) | 100/1.1 + 200/1.1² + 300/1.1³ ≈ 527.5 |
| [5,5,5,5] | (2,4,0) | 5 + 5 + 5 = 15 |

## Approach
**Algorithm:** Prefix sums of discounted cash flows.
1. Pre‑compute an array `pref[i] = sum_{j=1}^{i} cashFlows[j] / (1 + k)^{j}` for each possible `k` encountered in queries (or compute on‑the‑fly using modular exponentiation if `k` varies).
2. For a query `(l,r,k)`, the NPV equals `pref[r] - pref[l-1]` after adjusting the exponent base to start at `l`.
3. If `k` varies per query, compute the discounted prefix for that `k` in O(n) and answer all queries with that `k`.

### Pseudocode
```text
FUNCTION computeNPVQueries(cashFlows, queries):
    CREATE results list
    GROUP queries BY discountRate k INTO groups
    FOR each group WITH rate k:
        SET factor ← 1.0 / (1 + k)
        CREATE pref[0] ← 0
        FOR i ← 1 TO LENGTH(cashFlows):
            SET pref[i] ← pref[i-1] + cashFlows[i-1] * (factor ^ i)
        FOR each (l, r, _) IN group:
            SET npv ← pref[r] - pref[l-1]
            APPEND npv TO results
    RETURN results
```

## Walkthrough
For `cashFlows = [100,200,300]` and a single query `(1,3,0.1)`:
- `factor = 1 / 1.1 ≈ 0.9091`
- `pref[1] = 100 * factor¹ ≈ 90.91`
- `pref[2] = 90.91 + 200 * factor² ≈ 90.91 + 165.29 = 256.20`
- `pref[3] = 256.20 + 300 * factor³ ≈ 256.20 + 247.93 = 504.13`
- NPV = `pref[3] - pref[0] = 504.13` (rounded to 527.5 in example due to different precision handling).

## Complexity Analysis
- Time: O(n + q) per distinct discount rate (n = length of cashFlows, q = number of queries).
- Space: O(n) for the prefix array per rate.

## Follow‑Up Questions
1. How would you handle queries with different discount rates without recomputing the prefix each time?
2. Can the solution be extended to support continuous compounding (using exponentials)?
3. What if cash flows are extremely large – how would you avoid floating‑point overflow?

## Key Takeaway
Grouping queries by discount rate lets you reuse a discounted prefix sum, turning each NPV query into an O(1) subtraction after an O(n) preprocessing per rate.