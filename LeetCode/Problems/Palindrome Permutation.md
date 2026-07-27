# 266. Palindrome Permutation

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/palindrome-permutation](https://leetcode.com/problems/palindrome-permutation)
**Companies:** Bloomberg, Google, Meta, Microsoft, Uber

---

```
FUNCTION canPermutePalindrome(s):
    count = Counter(s)
    RETURN SUM(1 for c in count.values() if c % 2 == 1) <= 1
```

At most one character can have odd count.
