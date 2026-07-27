# 2451. Odd String Difference

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/odd-string-difference](https://leetcode.com/problems/odd-string-difference)
**Companies:** Ibm, Salesforce, Visa, Wise

---

```
FUNCTION oddString(words):
    diffs = {}
    FOR word IN words:
        d = tuple(ord(word[i+1]) - ord(word[i]) for i in range(len(word)-1))
        diffs.setdefault(d, []).append(word)
    FOR key, group IN diffs.items():
        IF len(group) == 1: RETURN group[0]
```
