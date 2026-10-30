# 1562. Find Latest Group of Size M

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-latest-group-of-size-m](https://leetcode.com/problems/find-latest-group-of-size-m)
**Companies:** Google

---

## Problem Description

Given an array `arr` that represents a permutation of numbers from `1` to `n`.

You have a binary string of size `n` that initially has all its bits set to zero. At each step `i` (assuming both the binary string and `arr` are 1-indexed) from `1` to `n`, the bit at position `arr[i]` is set to `1`.

You are also given an integer `m`. Find the latest step at which there exists a group of ones of length `m`. A group of ones is a contiguous substring of `1`'s such that it cannot be extended in either direction.

Return *the latest step at which there exists a group of ones of length **exactly*** `m`. *If no such group exists, return* `-1`.

**Constraints:**

- `n == arr.length`
- `1 <= m <= n <= 10^5`
- `1 <= arr[i] <= n`
- All integers in `arr` are **distinct**.

---

## Approach: Track Group Lengths — O(n) ✅

```text
FUNCTION findLatestStep(arr, m):
    n ← LENGTH(arr)
    IF m == n: RETURN n
    length ← ARRAY[0..n+1] INITIALIZED TO 0  // length of group at each boundary
    countOfM ← 0
    result ← -1
    FOR step, pos IN ENUMERATE(arr, 1):
        left ← length[pos - 1]
        right ← length[pos + 1]
        newLen ← left + right + 1
        // Update boundaries of the merged group
        length[pos - left] ← newLen
        length[pos + right] ← newLen
        // Adjust count of groups of size m
        IF left == m: countOfM ← countOfM - 1
        IF right == m: countOfM ← countOfM - 1
        IF newLen == m: countOfM ← countOfM + 1
        IF countOfM > 0: result ← step
    RETURN result
```

---

## Examples

```
Example 1:
  Input: arr = [3,5,1,2,4], m = 1
  Output: 4
  Explanation:
  Step 1: "00100", groups: ["1"]
  Step 2: "00101", groups: ["1", "1"]
  Step 3: "10101", groups: ["1", "1", "1"]
  Step 4: "11101", groups: ["111", "1"]
  Step 5: "11111", groups: ["11111"]
  The latest step at which there exists a group of size 1 is step 4.
```

```
Example 2:
  Input: arr = [3,1,5,4,2], m = 2
  Output: -1
  Explanation:
  Step 1: "00100", groups: ["1"]
  Step 2: "10100", groups: ["1", "1"]
  Step 3: "10101", groups: ["1", "1", "1"]
  Step 4: "10111", groups: ["1", "111"]
  Step 5: "11111", groups: ["11111"]
  No group of size 2 exists during any step.
```

---

## Walkthrough

Consider `arr = [3,5,1,2,4]`, `m = 1`.

1. Step 1, set position 3 → groups: `[0001000]` → one group of size 1 → result = 1.
2. Step 2, set position 5 → groups: `[0001010]` → two groups of size 1 → result = 2.
3. Step 3, set position 1 → groups: `[1001010]` → three groups of size 1 → result = 3.
4. Step 4, set position 2 → groups merge to size 2 → no size‑1 groups → result stays = 3.
5. Step 5, set position 4 → groups merge to size 5 → still no size‑1 groups.

The latest step with a size‑1 group was step 3, so the algorithm returns `3`.

---

## Complexity Analysis

- **Time:** O(n) – single pass over the array.
- **Space:** O(n) – auxiliary array storing group lengths at boundaries.

---

## Follow‑Up Questions

1. How would you adapt the solution to return the earliest step instead of the latest?
2. Can you solve the problem using a Union‑Find data structure?
3. What changes are needed if the input positions are 0‑indexed?

---

## Key Takeaway

> **Track group lengths at boundaries. When a bit is set, merge with adjacent groups. Count groups of exactly size m using boundary updates.**