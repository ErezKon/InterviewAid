# 677. Map Sum Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/map-sum-pairs](https://leetcode.com/problems/map-sum-pairs)
**Companies:** Akuna Capital, Google

---

## 1. Problem Description

Design a map where `insert(key, val)` sets a key-value pair and `sum(prefix)` returns the sum of all values whose keys start with `prefix`.

---

## 2. Approach: Trie with Running Sums — O(L) per operation ✅

```
CLASS MapSum:
    CONSTRUCTOR:
        trie = {}
        map = {}

    FUNCTION insert(key, val):
        delta = val - map.get(key, 0)
        map[key] = val
        node = trie
        FOR c IN key:
            IF c NOT IN node: node[c] = {'sum': 0}
            node = node[c]
            node['sum'] += delta

    FUNCTION sum(prefix):
        node = trie
        FOR c IN prefix:
            IF c NOT IN node: RETURN 0
            node = node[c]
        RETURN node['sum']
```

| Time | Space |
|------|-------|
| O(L) per insert/sum | O(total chars) |

---

## 3. Key Takeaway

> Store running sums at each trie node. On insert, propagate the delta (new val - old val) along the path. Sum query just traverses the prefix and reads the stored sum.
