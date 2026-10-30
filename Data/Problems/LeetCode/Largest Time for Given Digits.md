# 949. Largest Time for Given Digits

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-time-for-given-digits](https://leetcode.com/problems/largest-time-for-given-digits)
**Companies:** Liveramp, Microsoft, Zoho

---

## 1. Problem Description

Given an array `arr` of 4 digits, find the latest 24-hour time that can be made using each digit **exactly once**.

24-hour times are formatted as `"HH:MM"`, where `HH` is between `00` and `23`, and `MM` is between `00` and `59`. The earliest 24-hour time is `00:00`, and the latest is `23:59`.

Return *the latest 24-hour time in* `"HH:MM"` *format*. If no valid time can be made, return an empty string.

**Constraints:**
- `arr.length == 4`
- `0 <= arr[i] <= 9`

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

```
Example 1:
  Input: arr = [1,2,3,4]
  Output: "23:41"
  Explanation: The valid 24-hour times are "12:34", "12:43", "13:24", "13:42", "14:23", "14:32", "21:34", "21:43", "23:14", and "23:41".
  Of these times, "23:41" is the latest.
```

```
Example 2:
  Input: arr = [5,5,5,5]
  Output: ""
  Explanation: There are no valid 24-hour times as "55:55" is not valid.
```

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
