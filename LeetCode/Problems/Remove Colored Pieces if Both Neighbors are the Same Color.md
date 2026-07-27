# 2038. Remove Colored Pieces if Both Neighbors are the Same Color

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-colored-pieces-if-both-neighbors-are-the-same-color](https://leetcode.com/problems/remove-colored-pieces-if-both-neighbors-are-the-same-color)
**Companies:** Ibm, Mathworks, Unity, Yelp

---

```
FUNCTION winnerOfGame(colors):
    a = b = 0
    FOR i ← 1 TO len(colors) - 2:
        IF colors[i-1] == colors[i] == colors[i+1]:
            IF colors[i] == 'A': a += 1
            ELSE: b += 1
    RETURN a > b
```
