# 686. Repeated String Match

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/repeated-string-match](https://leetcode.com/problems/repeated-string-match)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Uber

---

```
FUNCTION repeatedStringMatch(a, b):
    times = ceil(len(b) / len(a))
    repeated = a * times
    IF b IN repeated: RETURN times
    IF b IN repeated + a: RETURN times + 1
    RETURN -1
```

Need at least ceil(|b|/|a|) copies. Check one extra copy for overlap.
