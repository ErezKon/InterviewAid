# 455. Assign Cookies

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/assign-cookies](https://leetcode.com/problems/assign-cookies)
**Companies:** Accenture, Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Tcs, Zoho

---

```
FUNCTION findContentChildren(g, s):
    SORT g; SORT s
    child = cookie = 0
    WHILE child < len(g) AND cookie < len(s):
        IF s[cookie] >= g[child]:
            child += 1
        cookie += 1
    RETURN child
```

Greedy: give the smallest sufficient cookie to the least greedy child.
