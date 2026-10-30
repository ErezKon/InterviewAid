# 2424. Longest Uploaded Prefix

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-uploaded-prefix](https://leetcode.com/problems/longest-uploaded-prefix)
**Companies:** Google

---

## 1. Problem Description

You are given a stream of `n` videos, each represented by a **distinct** number from `1` to `n` that you need to "upload" to a server. You need to implement a data structure that calculates the length of the **longest uploaded prefix** at various points in the upload process.

We consider `i` to be an uploaded prefix if all videos in the range `1` to `i` (**inclusive**) have been uploaded to the server. The longest uploaded prefix is the **maximum **value of `i` that satisfies this definition.**
**
Implement the `LUPrefix `class:

- `LUPrefix(int n)` Initializes the object for a stream of `n` videos.
- `void upload(int video)` Uploads `video` to the server.
- `int longest()` Returns the length of the **longest uploaded prefix** defined above.

**Constraints:**
- `1 <= n <= 10^5`
- `1 <= video <= n`
- All values of `video` are **distinct**.
- At most `2 * 10^5` calls **in total** will be made to `upload` and `longest`.
- At least one call will be made to `longest`.

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
Input
["LUPrefix", "upload", "longest", "upload", "longest", "upload", "longest"]
[[4], [3], [], [1], [], [2], []]
Output:
[null, null, 0, null, 1, null, 3]
Explanation:
LUPrefix server = new LUPrefix(4);   // Initialize a stream of 4 videos.
server.upload(3);                    // Upload video 3.
server.longest();                    // Since video 1 has not been uploaded yet, there is no prefix.
                                     // So, we return 0.
server.upload(1);                    // Upload video 1.
server.longest();                    // The prefix [1] is the longest uploaded prefix, so we return 1.
server.upload(2);                    // Upload video 2.
server.longest();                    // The prefix [1,2,3] is the longest uploaded prefix, so we return 3.
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
