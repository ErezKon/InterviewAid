# 677. Map Sum Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/map-sum-pairs](https://leetcode.com/problems/map-sum-pairs)
**Companies:** Akuna Capital, Google

---

## 1. Problem Description

Design a map that allows you to do the following:

- Maps a string key to a given value.
- Returns the sum of the values that have a key with a prefix equal to a given string.

Implement the `MapSum` class:

- `MapSum()` Initializes the `MapSum` object.
- `void insert(String key, int val)` Inserts the `key-val` pair into the map. If the `key` already existed, the original `key-value` pair will be overridden to the new one.
- `int sum(string prefix)` Returns the sum of all the pairs' value whose `key` starts with the `prefix`.

**Constraints:**

- `1 <= key.length, prefix.length <= 50`
- `key` and `prefix` consist of only lowercase English letters.
- `1 <= val <= 1000`
- At most `50` calls will be made to `insert` and `sum`.

---

## 2. Examples

```
Example 1:
  Input:
  ["MapSum", "insert", "sum", "insert", "sum"]
  [[], ["apple", 3], ["ap"], ["app", 2], ["ap"]]
  Output:
  [null, null, 3, null, 5]
  Explanation:
  MapSum mapSum = new MapSum();
  mapSum.insert("apple", 3);
  mapSum.sum("ap");           // return 3 (apple = 3)
  mapSum.insert("app", 2);
  mapSum.sum("ap");           // return 5 (apple + app = 3 + 2 = 5)
```

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
