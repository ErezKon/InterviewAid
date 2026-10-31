# 978. Longest Turbulent Subarray

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-turbulent-subarray](https://leetcode.com/problems/longest-turbulent-subarray)
**Companies:** Amazon, Bloomberg, Google

---

## 1. Problem Description

Given an integer array `arr`, return *the length of a maximum size turbulent subarray of* `arr`.

A subarray is **turbulent** if the comparison sign flips between each adjacent pair of elements in the subarray.

More formally, a subarray `[arr[i], arr[i + 1], ..., arr[j]]` of `arr` is said to be turbulent if and only if:

- For `i <= k < j`:

- `arr[k] > arr[k + 1]` when `k` is odd, and
- `arr[k] < arr[k + 1]` when `k` is even.

- Or, for `i <= k < j`:

- `arr[k] > arr[k + 1]` when `k` is even, and
- `arr[k] < arr[k + 1]` when `k` is odd.

**Constraints:**
- `1 <= arr.length <= 4 * 10^4`
- `0 <= arr[i] <= 10^9`

---

## 2. Examples

**Example 1:**
```
Input: arr = [9,4,2,10,7,8,8,1,9]
Output: 5
Explanation: arr[1] > arr[2] < arr[3] > arr[4] < arr[5]
```

**Example 2:**
```
Input: arr = [4,8,12,16]
Output: 2
```

**Example 3:**
```
Input: arr = [100]
Output: 1
```

---

## 3. Approach: Two Counters — O(n) ✅

```text
FUNCTION maxTurbulenceSize(arr):
    inc ← 1
    dec ← 1
    maxLen ← 1
    FOR i ← 1 TO len(arr) - 1:
        IF arr[i] > arr[i-1]:
            inc ← dec + 1
            dec ← 1
        ELSE IF arr[i] < arr[i-1]:
            dec ← inc + 1
            inc ← 1
        ELSE:
            inc ← 1
            dec ← 1
        maxLen ← MAX(maxLen, inc, dec)
    RETURN maxLen
```

---

## 4. Walkthrough

| Index | arr[i] | Comparison | inc | dec | maxLen |
|-------|--------|------------|-----|-----|--------|
| 0     | 9      | –          | 1   | 1   | 1 |
| 1     | 4      | 9 > 4 ↓    | 1   | 2   | 2 |
| 2     | 2      | 4 > 2 ↓    | 1   | 3   | 3 |
| 3     | 10     | 2 < 10 ↑   | 4   | 1   | 4 |
| 4     | 7      | 10 > 7 ↓   | 1   | 5   | 5 |
| 5     | 8      | 7 < 8 ↑    | 6   | 1   | 6 |
| 6     | 8      | 8 = 8 –    | 1   | 1   | 6 |
| 7     | 1      | 8 > 1 ↓    | 1   | 2   | 6 |
| 8     | 9      | 1 < 9 ↑    | 3   | 1   | 6 |

The longest turbulent length observed is 5 (indices 1-5).

---

## 5. Complexity Analysis

- **Time:** O(n) – single pass through the array.
- **Space:** O(1) – only a few integer variables.

---

## 6. Follow-Up Questions

1. How would you modify the algorithm to return the actual subarray, not just its length?
2. Can the approach be extended to handle circular arrays?
3. What if the definition of turbulence allowed equal elements to break the pattern?

---

## Key Takeaway

> Track `inc` (ending with increase) and `dec` (ending with decrease). On increase: `inc = dec + 1` (extends a previous decrease). On decrease: `dec = inc + 1`. This captures the alternating pattern.