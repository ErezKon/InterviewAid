# 875. Koko Eating Bananas — Binary Search on Answer Pattern

See also: [Koko Eating Bananas.md](Koko%20Eating%20Bananas.md) for the full solution.

**Companies:** Accenture, Adobe, Amazon, Atlassian, Autodesk, Bloomberg, Citadel, De Shaw, Doordash, Flipkart, Goldman Sachs, Google, Hashedin, Ibm, Infosys, Josh Technology, Linkedin, Meta, Microsoft, Netflix, Oracle, Oyo, Palo Alto Networks, Paypal, Phonepe, Quantiphi, Quince, Ripple, Salesforce, Snapchat, Swiggy, Tcs, Tiktok, Trexquant, Turing, Uber, Vmware, Zepto
---

## Problem Description
Given an array `piles` where `piles[i]` is the number of bananas in the i‑th pile and an integer `h` representing hours, Koko can eat bananas at a constant speed `k` (bananas per hour). Each hour she chooses a pile and eats `k` bananas from it (or the whole pile if fewer remain). Find the minimum integer `k` such that Koko can finish all piles within `h` hours.

## Examples
**Example 1:**
```
Input: piles = [3,6,7,11], h = 8
Output: 4
Explanation: At speed 4, Koko finishes in 8 hours.
```
**Example 2:**
```
Input: piles = [30,11,23,4,20], h = 5
Output: 30
```

## Approach
The answer `k` is monotonic: if a speed works, any larger speed also works. Apply binary search on the speed range.
1. Set `lo = 1`, `hi = max(piles)`.
2. While `lo < hi`:
   - `mid = (lo + hi) // 2`.
   - Compute total hours needed with speed `mid`:
     `hours = Σ ceil(pile / mid)`.
   - If `hours ≤ h`, `hi = mid` (try smaller speed).
   - Else `lo = mid + 1`.
3. Return `lo`.

```text
FUNCTION minEatingSpeed(piles, h):
    SET lo ← 1
    SET hi ← MAX(piles)
    WHILE lo < hi:
        SET mid ← (lo + hi) // 2
        SET hours ← 0
        FOR pile IN piles:
            SET hours ← hours + CEIL(pile / mid)
        IF hours ≤ h:
            SET hi ← mid
        ELSE:
            SET lo ← mid + 1
    RETURN lo
```

## Walkthrough
| Speed `k` | Hours needed | Feasible? |
|-----------|--------------|----------|
| 4 | 8 | yes |
| 3 | 10 | no |
| 5 | 7 | yes |
The binary search narrows to `k = 4`.

## Complexity Analysis
- **Time:** O(n log M) where `n` is number of piles and `M = max(piles)`.
- **Space:** O(1) extra space.

## Follow-Up Questions
1. How would the solution change if Koko could eat from multiple piles simultaneously?
2. Can you adapt the pattern to minimize the maximum load when distributing tasks over workers?
3. What if the eating speed must be a multiple of a given integer?

## Key Takeaway
When the feasibility of a numeric answer is monotonic, binary search on the answer efficiently finds the optimum.
