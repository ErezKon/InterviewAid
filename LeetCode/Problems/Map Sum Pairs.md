# 677. Map Sum Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/map-sum-pairs](https://leetcode.com/problems/map-sum-pairs)
**Companies:** Akuna Capital, Google

---

## 1. Problem Description

Design a map where `insert(key, val)` sets a key-value pair and `sum(prefix)` returns the sum of all values whose keys start with `prefix`.

---

## 2. Examples

| Operation | Input | Output |
|-----------|-------|--------|
| `insert` | `("apple", 3)` | — |
| `sum` | `"ap"` | `3` |
| `insert` | `("app", 2)` | — |
| `sum` | `"ap"` | `5` |

---

## 3. Approach: Trie with Running Sums — O(L) per operation ✅

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

---

## 4. Walkthrough

1. **Insert "apple" = 3**: delta = 3 (new key). Traverse nodes `a → p → p → l → e`, creating them and adding `+3` to each node's `sum`.
2. **Sum "ap"**: Traverse `a → p` and read `sum = 3`.
3. **Insert "app" = 2**: previous value for "app" is 0, delta = 2. Update nodes `a → p → p`, adding `+2` to each node's `sum`. Now node `p` (second) has `sum = 5`.
4. **Sum "ap"**: Traversal reaches node `p` with `sum = 5`, returning 5.

---

## 5. Complexity Analysis

- **Time:** O(L) per `insert` or `sum`, where L is the length of the key/prefix.
- **Space:** O(T) – total characters stored across all keys in the trie.

---

## 6. Follow-Up Questions

- How would you modify the structure to support deletion of a key?
- Can you extend it to handle weighted prefixes where each key contributes a weight factor?

---

## 3. Key Takeaway

> Store running sums at each trie node. On insert, propagate the delta (new val - old val) along the path. Sum query just traverses the prefix and reads the stored sum.
