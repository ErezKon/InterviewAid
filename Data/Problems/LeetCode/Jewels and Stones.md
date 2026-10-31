# 771. Jewels and Stones

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/jewels-and-stones](https://leetcode.com/problems/jewels-and-stones)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Yandex

---

## 1. Problem Description

You're given strings `jewels` representing the types of stones that are jewels, and `stones` representing the stones you have. Each character in `stones` is a type of stone you have. You want to know how many of the stones you have are also jewels.

Letters are case sensitive, so `"a"` is considered a different type of stone from `"A"`.

**Constraints:**
- `1 <= jewels.length, stones.length <= 50`
- `jewels` and `stones` consist of only English letters.
- All the characters of `jewels` are **unique**.

---

## 2. Approach: Hash Set — O(m+n) ✅

```text
FUNCTION numJewelsInStones(jewels, stones):
    // Build a set of jewel characters for O(1) lookup
    SET jewelSet ← SET(jewels)
    SET count ← 0
    FOR ch IN stones:
        IF ch IN jewelSet:
            SET count ← count + 1
    RETURN count
```

| Time | Space |
|------|-------|
| O(m + n) | O(m) where m = len(jewels) |

---

## 3. Examples

**Example 1:**
```
Input: jewels = "aA", stones = "aAAbbbb"
Output: 3
```

**Example 2:**
```
Input: jewels = "z", stones = "ZZ"
Output: 0
```

---

## 4. Walkthrough

1. Convert `jewels` = `"aA"` into a set `{ 'a', 'A' }`.
2. Iterate over `stones` = `"aAAbbbb"`:
   - `a` is in set → count = 1
   - `A` is in set → count = 2
   - `A` is in set → count = 3
   - remaining `b`s are not in set.
3. Return final count `3`.

---

## 5. Complexity Analysis

- **Time:** O(m + n) – one pass to build the set and one pass to count.
- **Space:** O(m) – storage for the set of jewel characters.

---

## 6. Follow-Up Questions

- How would you solve the problem if the input strings were extremely large and could not fit into memory?
- Can you adapt the solution to handle Unicode characters beyond the basic ASCII set?
- What if you needed to return the list of matching stones instead of just the count?

---

## Key Takeaway

> Convert jewels to a set for O(1) lookup, then count matches in stones. A classic "hash set for membership testing" warm-up problem.
