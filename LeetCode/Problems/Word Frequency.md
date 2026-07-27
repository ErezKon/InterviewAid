# 192. Word Frequency

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/word-frequency](https://leetcode.com/problems/word-frequency)
**Companies:** Google, Meta, Microsoft

---

```bash
cat words.txt | tr -s ' ' '\n' | sort | uniq -c | sort -rn | awk '{print $2, $1}'
```
