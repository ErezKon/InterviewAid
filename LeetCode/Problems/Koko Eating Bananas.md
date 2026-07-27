# 875. Koko Eating Bananas

**Difficulty:** 🟡 Medium
**Acceptance:** 50.0%
**LeetCode:** [https://leetcode.com/problems/koko-eating-bananas](https://leetcode.com/problems/koko-eating-bananas)
**Companies:** Accenture, Adobe, Amazon, Atlassian, Autodesk, Bloomberg, Citadel, De Shaw, Doordash, Flipkart, Goldman Sachs, Google, Hashedin, Ibm, Infosys, Josh Technology, Linkedin, Meta, Microsoft, Netflix, Oracle, Oyo, Palo Alto Networks, Paypal, Phonepe, Quantiphi, Quince, Ripple, Salesforce, Snapchat, Swiggy, Tcs, Tiktok, Trexquant, Turing, Uber, Vmware, Zepto

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Binary Search on Answer — O(n log M) ✅](#3-approach-binary-search-on-answer--on-log-m-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

Koko loves bananas. There are `n` piles of bananas, where `piles[i]` has `piles[i]` bananas. Guards will return in `h` hours.

Koko can choose her eating speed `k` (bananas per hour). Each hour, she chooses a pile and eats `k` bananas. If the pile has fewer than `k`, she eats the whole pile and waits the rest of the hour.

Return the **minimum** integer `k` such that she can eat all bananas within `h` hours.

**Constraints:**
- `1 <= piles.length <= 10⁴`
- `piles.length <= h <= 10⁹`
- `1 <= piles[i] <= 10⁹`

---

## 2. Examples

```
Example 1:
  Input:  piles = [3,6,7,11], h = 8
  Output: 4

Example 2:
  Input:  piles = [30,11,23,4,20], h = 5
  Output: 30

Example 3:
  Input:  piles = [30,11,23,4,20], h = 6
  Output: 23
```

---

## 3. Approach: Binary Search on Answer — O(n log M) ✅

### Key Insight

The answer `k` is monotonic: if Koko can finish at speed `k`, she can also finish at any speed `> k`. Binary search the minimum valid `k`.

- Search range: `[1, max(piles)]`
- For each candidate `k`, check if total hours ≤ `h`.
- Hours for one pile: `ceil(pile / k)`

### Pseudocode

```
FUNCTION minEatingSpeed(piles, h):

    lo = 1
    hi = MAX(piles)

    WHILE lo < hi:
        mid = (lo + hi) / 2
        hours = totalHours(piles, mid)

        IF hours <= h:
            hi = mid           // mid might be the answer, try smaller
        ELSE:
            lo = mid + 1       // too slow, need faster

    RETURN lo

FUNCTION totalHours(piles, k):
    hours = 0
    FOR pile IN piles:
        hours += CEIL(pile / k)    // equivalently: (pile + k - 1) / k
    RETURN hours
```

---

## 4. Walkthrough

```
piles = [3,6,7,11], h = 8

lo=1, hi=11

mid=6: hours = ceil(3/6)+ceil(6/6)+ceil(7/6)+ceil(11/6) = 1+1+2+2 = 6 ≤ 8 → hi=6
mid=3: hours = ceil(3/3)+ceil(6/3)+ceil(7/3)+ceil(11/3) = 1+2+3+4 = 10 > 8 → lo=4
mid=5: hours = 1+2+2+3 = 8 ≤ 8 → hi=5
mid=4: hours = 1+2+2+3 = 8 ≤ 8 → hi=4
lo=4 == hi=4 → RETURN 4 ✅
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · log M) where M = max(piles) |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

### 6.1 What if Koko can eat from multiple piles per hour?

Then hours = ceil(totalBananas / k). Binary search still works with a different `totalHours` function.

### 6.2 Capacity To Ship Packages (LeetCode #1011)?

Same binary search on answer pattern. Search for minimum ship capacity such that packages can be shipped in `days` days.

### 6.3 Split Array Largest Sum (LeetCode #410)?

Binary search on the maximum subarray sum. For each candidate, greedily check if the array can be split into ≤ k subarrays.

### 6.4 General "Binary Search on Answer" pattern?

When the problem asks for "minimum/maximum value satisfying a condition" and the condition is monotonic (once true, stays true or vice versa), binary search the answer. Common in optimization problems.

---

## Key Takeaway

> **Binary search on the answer** is a powerful pattern for optimization problems where the feasibility function is monotonic. Instead of searching for an element in an array, you search for the optimal value in a continuous/discrete range. The template: binary search `[lo, hi]`, check feasibility at `mid`, narrow the range.
