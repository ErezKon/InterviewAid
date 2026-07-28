# 1133. Largest Unique Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-unique-number](https://leetcode.com/problems/largest-unique-number)
**Companies:** Amazon

---

## 1. Problem Description

Return the largest integer that appears exactly once in `nums`. Return -1 if none.

---

## 2. Approach: Counter — O(n) ✅

```text
FUNCTION largestUniqueNumber(nums):
    count ← MAP()
    FOR num IN nums:
        IF num IN count:
            count[num] ← count[num] + 1
        ELSE:
            count[num] ← 1
    result ← -1
    FOR num, freq IN count:
        IF freq = 1 AND num > result:
            result ← num
    RETURN result
```

---

## 3. Examples

| Input | Output |
|-------|--------|
| `[5,7,3,9,4,9,8,5,4]` | `8` |
| `[9,9,8,8]` | `-1` |

---

## 4. Walkthrough

1. Build frequency map: `{5:2,7:1,3:1,9:2,4:2,8:1}`.
2. Scan map for numbers with frequency 1: 7,3,8.
3. Track maximum among them → 8.
4. Return 8.

---

## 5. Complexity Analysis

- **Time:** O(n) – one pass to count, one pass to find max.
- **Space:** O(n) – storage for frequency map.

---

## 6. Follow‑Up Questions

- How would you solve it if the input array were read as a stream?
- Can you achieve O(1) extra space by modifying the array in‑place?
- What if you needed the second‑largest unique number?

---

## 3. Key Takeaway

> Count frequencies, then find the max element with count == 1.
