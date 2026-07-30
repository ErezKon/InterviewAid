# 2424. Longest Uploaded Prefix

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-uploaded-prefix](https://leetcode.com/problems/longest-uploaded-prefix)
**Companies:** Google

---

## 1. Problem Description

Design a system where videos are uploaded (not necessarily in order). At any point, return the longest prefix of consecutively uploaded videos.

---

## 2. Approach: Set + Pointer — O(1) amortized ✅

```text
CLASS LUPrefix:
    INIT(n):
        uploaded ← SET()
        prefix ← 0

    FUNCTION upload(video):
        uploaded.ADD(video)
        WHILE prefix + 1 IN uploaded:
            prefix ← prefix + 1

    FUNCTION longest():
        RETURN prefix
```

| Time | Space |
|------|-------|
| O(1) amortized per operation | O(n) |

---

## 3. Examples

**Example 1:**
```
LUPrefix obj = LUPrefix(5)
obj.upload(3)
obj.upload(1)
obj.upload(2)
obj.longest() // returns 2 (videos 1 and 2 are consecutive)
obj.upload(5)
obj.upload(4)
obj.longest() // returns 5 (all videos 1‑5 uploaded)
```

**Example 2:**
```
LUPrefix obj = LUPrefix(3)
obj.upload(2)
obj.longest() // returns 0 (no prefix starting at 1)
obj.upload(1)
obj.longest() // returns 2 (videos 1 and 2 uploaded)
```

---

## 4. Walkthrough

| Step | Operation | Uploaded Set | Prefix |
|------|-----------|--------------|--------|
| 1 | upload(3) | {3} | 0 |
| 2 | upload(1) | {1,3} | 1 |
| 3 | upload(2) | {1,2,3} | 3 (advances through 2 then 3) |
| 4 | longest() | — | returns 3 |
| 5 | upload(5) | {1,2,3,5} | 3 |
| 6 | upload(4) | {1,2,3,4,5} | 5 |
| 7 | longest() | — | returns 5 |

---

## 5. Complexity Analysis

- **Time:** Each video is added once and the pointer moves at most `n` steps total → O(1) amortized per `upload`, O(1) for `longest`.
- **Space:** Stores up to `n` uploaded video IDs in a set → O(n).

---

## 6. Follow-Up Questions

1. How would you modify the design to support removal of previously uploaded videos?
2. Can you extend the system to handle multiple independent streams of uploads?
3. What if the video IDs are not bounded by `n` and can be any large integer?

---

## Key Takeaway

Maintain a pointer to the current longest prefix and a set of uploaded IDs; each upload advances the pointer only when the next consecutive ID is present, yielding amortized O(1) operations.
