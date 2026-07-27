# 187. Repeated DNA Sequences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/repeated-dna-sequences](https://leetcode.com/problems/repeated-dna-sequences)
**Companies:** Amazon, Bloomberg, Google, Grammarly, Linkedin, Meta, Microsoft

---

```
FUNCTION findRepeatedDnaSequences(s):
    seen = set()
    repeated = set()
    FOR i ← 0 TO len(s) - 10:
        sub = s[i:i+10]
        IF sub IN seen: repeated.ADD(sub)
        seen.ADD(sub)
    RETURN list(repeated)
```

Rolling hash or just use string slicing with a hash set.
