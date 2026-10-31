# 2053. Kth Distinct String in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/kth-distinct-string-in-an-array](https://leetcode.com/problems/kth-distinct-string-in-an-array)
**Companies:** Amazon, Google

---

## 1. Problem Description

A **distinct string** is a string that is present only **once** in an array.

Given an array of strings `arr`, and an integer `k`, return *the *`k^th`* **distinct string** present in *`arr`. If there are **fewer** than `k` distinct strings, return *an **empty string ***`""`.

Note that the strings are considered in the **order in which they appear** in the array.

**Constraints:**
- `1 <= k <= arr.length <= 1000`
- `1 <= arr[i].length <= 5`
- `arr[i]` consists of lowercase English letters.

---

## 2. Approach: Counter + Linear Scan — O(n) ✅

```text
FUNCTION kthDistinct(arr, k):
    count ← Counter(arr) // map string → frequency
    FOR s IN arr:
        IF count[s] == 1:
            k ← k - 1
            IF k == 0:
                RETURN s
    RETURN ""
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Examples

**Example 1:**
```
Input: arr = ["d","b","c","b","c","a"], k = 2
Output: "a"
Explanation: The only distinct strings in arr are "d" and "a".
"d" appears 1^st, so it is the 1^st distinct string.
"a" appears 2^nd, so it is the 2^nd distinct string.
Since k == 2, "a" is returned.
```

**Example 2:**
```
Input: arr = ["aaa","aa","a"], k = 1
Output: "aaa"
Explanation: All strings in arr are distinct, so the 1^st string "aaa" is returned.
```

**Example 3:**
```
Input: arr = ["a","b","a"], k = 3
Output: ""
Explanation: The only distinct string is "b". Since there are fewer than 3 distinct strings, we return an empty string "".
```

---

## 4. Walkthrough

Take `arr = ["d","b","c","b","c","a"]`, `k = 2`.

1. **Count frequencies:** `{"d":1, "b":2, "c":2, "a":1}`.
2. **Iterate in order:**
   - `"d"` has count 1 → `k` becomes 1.
   - `"b"` count 2 → skip.
   - `"c"` count 2 → skip.
   - `"b"` skip.
   - `"c"` skip.
   - `"a"` count 1 → `k` becomes 0 → return `"a"`.

---

## 5. Complexity Analysis

| Metric | Value |
|--------|-------|
| Time   | O(n) – one pass to count, one pass to find k-th distinct |
| Space  | O(n) – hashmap for frequencies |

---

## 6. Follow-Up Questions

- How would you modify the solution to return all distinct strings in order?
- Can you solve it with O(1) extra space if the input array is mutable?

---

## Key Takeaway

> Use a frequency map to identify strings that appear exactly once, then scan the original array to pick the `k`-th such string.
