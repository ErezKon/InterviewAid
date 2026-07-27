# 1668. Maximum Repeating Substring

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-repeating-substring](https://leetcode.com/problems/maximum-repeating-substring)
**Companies:** Amazon, Asana, Bloomberg, Google, Pure Storage, Turing

---

```
FUNCTION maxRepeating(sequence, word):
    k = 0
    WHILE word * (k + 1) IN sequence:
        k += 1
    RETURN k
```
