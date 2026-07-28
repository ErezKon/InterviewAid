# 949. Largest Time for Given Digits

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-time-for-given-digits](https://leetcode.com/problems/largest-time-for-given-digits)
**Companies:** Liveramp, Microsoft, Zoho

---

## 1. Problem Description

Given 4 digits, return the largest 24-hour time (HH:MM) that can be formed. Return `""` if no valid time.

---

## 2. Approach: Enumerate Permutations — O(1) ✅

```text
FUNCTION largestTimeFromDigits(arr):
    best ← ""
    FOR perm IN permutations(arr):
        h ← perm[0] * 10 + perm[1]
        m ← perm[2] * 10 + perm[3]
        IF h < 24 AND m < 60:
            time ← FORMAT("{0:02d}:{1:02d}", h, m)
            IF time > best:
                best ← time
    RETURN best
```

| Time | Space |
|------|-------|
| O(4!) = O(24) = O(1) | O(1) |

---

## 3. Examples

| Input | Output |
|-------|--------|
| `[1,2,3,4]` | `"23:41"` |
| `[5,5,5,5]` | `""` |

---

## 4. Walkthrough

Take the first example `[1,2,3,4]`.
1. Generate all 24 permutations of the four digits.
2. For each permutation compute hour = first two digits, minute = last two digits.
3. Discard permutations where hour ≥ 24 or minute ≥ 60.
4. Convert remaining valid times to strings `"HH:MM"`.
5. Keep the maximum string lexicographically, which yields `"23:41"`.

---

## 5. Complexity Analysis

- **Time:** Constant 24 permutations → O(1).
- **Space:** Only a few variables and the current permutation → O(1).

---

## 6. Follow-Up Questions

- How would you modify the solution if the input size were larger (e.g., 6 digits forming HH:MM:SS)?
- Can you solve it without generating all permutations, using a greedy construction?
- How would you handle time zones or 12‑hour format?

---

## 3. Key Takeaway

> Only 24 permutations of 4 digits — brute force all, filter valid times, take the max. String comparison works for "HH:MM" format.
