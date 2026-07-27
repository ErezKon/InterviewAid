# 2423. Remove Letter To Equalize Frequency

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/remove-letter-to-equalize-frequency](https://leetcode.com/problems/remove-letter-to-equalize-frequency)
**Companies:** Bloomberg, Google, Tcs, Walmart Labs

---

```
FUNCTION equalFrequency(word):
    FOR i ← 0 TO len(word) - 1:
        remaining = word[:i] + word[i+1:]
        IF len(SET(Counter(remaining).values())) == 1: RETURN true
    RETURN false
```
