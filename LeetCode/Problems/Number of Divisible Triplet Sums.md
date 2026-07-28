# 2964. Number of Divisible Triplet Sums

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-divisible-triplet-sums](https://leetcode.com/problems/number-of-divisible-triplet-sums)
**Companies:** Activision, Att, Ibm, Linkedin, Mathworks, Palantir, Salesforce, Visa, Zscaler

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Hash Map of Pair Sums — O(n²)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Count triplets `(i, j, k)` with `i < j < k` where `(nums[i] + nums[j] + nums[k]) % d == 0`.

---

## 2. Key Insight

> Fix `k`, maintain a hash map of `(nums[i] + nums[j]) % d` for all `i < j < k`. Look up complement `(d - nums[k] % d) % d`.

---

## 3. Approach: Hash Map of Pair Sums — O(n²) ✅

```text
FUNCTION divisibleTripletCount(nums, d):
    SET count ← 0
    SET n ← LENGTH(nums)

    FOR k ← 2 TO n - 1:
        SET pairMod ← EMPTY MAP
        FOR j ← 0 TO k - 1:
            FOR i ← 0 TO j - 1:
                SET modVal ← (nums[i] + nums[j]) MOD d
                INCREMENT pairMod[modVal] BY 1
        SET complement ← (d - (nums[k] MOD d)) MOD d
        ADD pairMod[complement] TO count

    RETURN count
```

---

## 4. Examples

| nums | d | Output | Explanation |
|------|---|--------|-------------|
| [1,2,3,4,5] | 3 | 4 | The valid triplets are (0,1,2), (0,2,4), (1,2,3), (2,3,4). |
| [2,2,2,2] | 2 | 4 | Every combination of three indices sums to a multiple of 2; C(4,3)=4.

---

## 5. Walkthrough

Consider the first example `nums = [1,2,3,4,5]`, `d = 3`.

| Step | k | Pair Mod Map (mod 3) | Complement | Triplets added |
|------|---|----------------------|------------|----------------|
| 1 | 2 (value 3) | {(1+2)%3 = 0:1} | (3-0)%3 = 0 | +1 (indices 0,1,2) |
| 2 | 3 (value 4) | {(1+2)%3=0:1, (1+3)%3=1:1, (2+3)%3=2:1} | (3-1)%3=2 | +1 (indices 1,2,3) |
| 3 | 4 (value 5) | {(1+2)%3=0:1, (1+3)%3=1:1, (1+4)%3=2:1, (2+3)%3=2:2, (2+4)%3=0:2, (3+4)%3=1:2} | (3-2)%3=1 | +2 (indices 0,2,4 and 2,3,4) |

Total count = 4.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) |
| **Space** | O(d) |

---

## 7. Follow-Up Questions

1. How would you adapt the solution if `d` could be up to 10⁹? (Consider using a hashmap with only observed remainders.)
2. Can you extend the approach to count quadruplets whose sum is divisible by `d`?
3. What if the array is sorted—can a two‑pointer technique be applied?

---

## 8. Key Takeaway

> **Reduce a triplet condition to a pair‑sum remainder lookup.** By fixing the third element and storing remainders of all previous pairs, the problem becomes a simple complement search.
