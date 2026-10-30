# 386. Lexicographical Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lexicographical-numbers](https://leetcode.com/problems/lexicographical-numbers)
**Companies:** Amazon, Barclays, Bloomberg, Google, Meta, Microsoft

---

## 1. Problem Description

Given an integer `n`, return all the numbers in the range `[1, n]` sorted in lexicographical order.

You must write an algorithm that runs in `O(n)` time and uses `O(1)` extra space.

**Constraints:**
- `1 <= n <= 5 * 10^4`

---

## 2. Examples

```
Example 1:
  Input: n = 13
  Output: [1,10,11,12,13,2,3,4,5,6,7,8,9]
```

```
Example 2:
  Input: n = 2
  Output: [1,2]
```

---

## 3. Approach: DFS on Number Trie — O(n) ✅

```text
FUNCTION lexicalOrder(n):
    SET result ← []
    SET curr ← 1
    FOR _ ← 0 TO n - 1:
        APPEND curr TO result
        IF curr * 10 ≤ n:
            SET curr ← curr * 10
        ELSE:
            WHILE curr % 10 = 9 OR curr ≥ n:
                SET curr ← curr / 10
            SET curr ← curr + 1
    RETURN result
```

---

## 4. Walkthrough

For `n = 13`:
1. Start `curr = 1`, add to result.
2. `1*10 = 10 ≤ 13` → `curr = 10`, add.
3. `10*10 = 100 > 13`, cannot go deeper. Increment: `curr = 11`, add.
4. Continue adding `12`, `13`.
5. `13` cannot go deeper; backtrack by dividing by 10 until last digit < 9 → `curr = 1` then `curr = 2`.
6. Add `2` through `9` similarly.
Result matches lexicographic order.

---

## 5. Complexity Analysis

- **Time:** O(n) – each number from 1 to n is visited exactly once.
- **Space:** O(1) extra space (output list excluded).

---

## 6. Follow-Up Questions

- How would you generate the order for a very large `n` without storing the entire list?
- Can you adapt the algorithm to support a custom alphabetic ordering?
- What changes are needed if numbers can have leading zeros?

---

## 3. Key Takeaway

> Simulate a pre‑order DFS on a virtual trie of numbers: go deeper (×10) when possible, otherwise move to the next sibling (+1) or backtrack (÷10). This yields lexicographic order in linear time.
