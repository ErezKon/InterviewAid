# 1258. Synonymous Sentences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/synonymous-sentences](https://leetcode.com/problems/synonymous-sentences)
**Companies:** Cruise Automation, Moveworks, Rippling

---

```
FUNCTION generateSentences(synonyms, text):
    // Union-Find to group synonyms
    uf = UnionFind()
    FOR [a, b] IN synonyms: uf.union(a, b)

    groups = defaultdict(set)
    FOR [a, b] IN synonyms:
        groups[uf.find(a)].ADD(a)
        groups[uf.find(a)].ADD(b)

    words = text.split()
    result = []
    FUNCTION backtrack(idx, current):
        IF idx == len(words): result.ADD(JOIN(current, ' ')); RETURN
        root = uf.find(words[idx])
        FOR synonym IN sorted(groups.get(root, {words[idx]})):
            backtrack(idx + 1, current + [synonym])
    backtrack(0, [])
    RETURN result
```
