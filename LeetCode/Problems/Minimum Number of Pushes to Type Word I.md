# 3014. Minimum Number of Pushes to Type Word I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-pushes-to-type-word-i](https://leetcode.com/problems/minimum-number-of-pushes-to-type-word-i)
**Companies:** Amazon, Elitmus, Google, Snapchat

---

```
FUNCTION minimumPushes(word):
    n = len(word)
    RETURN 8 * (1) + ... // first 8 chars cost 1, next 8 cost 2, etc.
    pushes = 0
    FOR i ← 0 TO n - 1:
        pushes += i // 8 + 1
    RETURN pushes
```
