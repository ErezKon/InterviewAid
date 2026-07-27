# 923. 3Sum With Multiplicity

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/3sum-with-multiplicity](https://leetcode.com/problems/3sum-with-multiplicity)
**Companies:** Amazon, Google, Meta, Quora

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Counting + Combinatorics — O(n + k²) ✅](#4-approach-counting--combinatorics--on--k²-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an integer array `arr` and an integer `target`, return the number of tuples `(i, j, k)` such that `i < j < k` and `arr[i] + arr[j] + arr[k] == target`.

Since the answer can be very large, return it modulo `10⁹ + 7`.

**Constraints:**
- `3 ≤ arr.length ≤ 3000`
- `0 ≤ arr[i] ≤ 100`
- `0 ≤ target ≤ 300`

---

## 2. Examples

```
Example 1:
  Input:  arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5], target = 8
  Output: 20

Example 2:
  Input:  arr = [1, 1, 2, 2, 2, 2], target = 5
  Output: 12
  Explanation: arr[i]=1, arr[j]=2, arr[k]=2 → C(2,1)·C(4,2) = 2·6 = 12
```

---

## 3. Key Insight

> Since values are bounded (0-100), count frequencies and use **combinatorics** instead of iterating over all triples. For each triple of values `(a, b, c)` with `a + b + c == target`, compute how many index-ordered tuples they produce using combination formulas.

Three cases for values `a ≤ b ≤ c`:
- `a == b == c`: C(count, 3)
- `a == b ≠ c`: C(count_a, 2) × count_c
- `a ≠ b == c`: count_a × C(count_b, 2)
- `a < b < c`: count_a × count_b × count_c

---

## 4. Approach: Counting + Combinatorics — O(n + k²) ✅

```
FUNCTION threeSumMulti(arr, target):
    MOD = 10^9 + 7
    count = Counter(arr)
    keys = sorted(count.keys())
    result = 0

    FOR i, a IN enumerate(keys):
        FOR j ← i TO len(keys) - 1:
            b = keys[j]
            c = target - a - b
            IF c < b: BREAK
            IF c NOT IN count: CONTINUE

            IF a == b == c:
                result += count[a] * (count[a]-1) * (count[a]-2) / 6
            ELSE IF a == b:
                result += count[a] * (count[a]-1) / 2 * count[c]
            ELSE IF b == c:
                result += count[a] * count[b] * (count[b]-1) / 2
            ELSE:
                result += count[a] * count[b] * count[c]

    RETURN result % MOD
```

---

## 5. Walkthrough

```
arr = [1, 1, 2, 2, 2, 2], target = 5
count = {1: 2, 2: 4}
keys = [1, 2]

a=1, b=1: c = 5-1-1 = 3, 3 not in count → skip
a=1, b=2: c = 5-1-2 = 2, c=2 >= b=2 ✓
  a≠b, b==c → count[1] × C(4,2) = 2 × 6 = 12
a=2, b=2: c = 5-2-2 = 1, c=1 < b=2 → BREAK

Result: 12 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n + k²) where k = number of distinct values (≤ 101) |
| **Space** | O(k) for the frequency map |

---

## 7. Follow-Up Questions

### 7.1 Why not just use the standard 3Sum two-pointer approach?

It would be O(n²), which is fine for n ≤ 3000. But the counting approach leverages the small value range (0-100) to achieve effectively O(1) for the combinatorial part, making it much faster in practice.

### 7.2 Why use `c < b: BREAK`?

To enforce `a ≤ b ≤ c` and avoid counting the same triple of values multiple times. Since `b` increases and `c = target - a - b` decreases, once `c < b` we can stop.

---

## 8. Key Takeaway

> When values are bounded, **count frequencies and use combinatorics** instead of iterating all tuples. The three cases (all equal, two equal, all different) with their combination formulas turn an O(n³) brute force into an efficient O(k²) solution.
