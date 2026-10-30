# 706. Design HashMap

**Difficulty:** 🟢 Easy
**Acceptance:** 65.0%
**LeetCode:** [https://leetcode.com/problems/design-hashmap](https://leetcode.com/problems/design-hashmap)
**Companies:** Amazon, Apple, Couchbase, Goldman Sachs, Google, Linkedin, Meta, Microsoft, Oracle, Palo Alto Networks, Servicenow, Snowflake, Tiktok, Tripactions

---

## 1. Problem Description

Design a HashMap without using any built-in hash table libraries.

Implement the `MyHashMap` class:

- `MyHashMap()` initializes the object with an empty map.
- `void put(int key, int value)` inserts a `(key, value)` pair into the HashMap. If the `key` already exists in the map, update the corresponding `value`.
- `int get(int key)` returns the `value` to which the specified `key` is mapped, or `-1` if this map contains no mapping for the `key`.
- `void remove(key)` removes the `key` and its corresponding `value` if the map contains the mapping for the `key`.

**Constraints:**

- `0 <= key, value <= 10^6`
- At most `10^4` calls will be made to `put`, `get`, and `remove`.

---

## Examples

```
Example 1:
  Input:
  ["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"]
  [[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]
  Output:
  [null, null, null, 1, -1, null, 1, null, -1]
  Explanation:
  MyHashMap myHashMap = new MyHashMap();
  myHashMap.put(1, 1); // The map is now [[1,1]]
  myHashMap.put(2, 2); // The map is now [[1,1], [2,2]]
  myHashMap.get(1);    // return 1, The map is now [[1,1], [2,2]]
  myHashMap.get(3);    // return -1 (i.e., not found), The map is now [[1,1], [2,2]]
  myHashMap.put(2, 1); // The map is now [[1,1], [2,1]] (i.e., update the existing value)
  myHashMap.get(2);    // return 1, The map is now [[1,1], [2,1]]
  myHashMap.remove(2); // remove the mapping for 2, The map is now [[1,1]]
  myHashMap.get(2);    // return -1 (i.e., not found), The map is now [[1,1]]
```

---

## Approach: Array of Linked Lists (Chaining) ✅

```text
CLASS MyHashMap:
    SET SIZE ← 1000
    CONSTRUCTOR:
        SET buckets ← array of SIZE empty linked lists

    FUNCTION hash(key):
        RETURN key MOD SIZE

    FUNCTION put(key, value):
        SET idx ← hash(key)
        FOR node IN buckets[idx]:
            IF node.key == key:
                SET node.value ← value
                RETURN
        APPEND Node(key, value) TO buckets[idx]

    FUNCTION get(key):
        SET idx ← hash(key)
        FOR node IN buckets[idx]:
            IF node.key == key:
                RETURN node.value
        RETURN -1

    FUNCTION remove(key):
        SET idx ← hash(key)
        REMOVE node FROM buckets[idx] WHERE node.key == key
```

Average O(1), worst O(n/SIZE) per operation.

---

## Walkthrough

| Operation | idx (key % 1000) | Action | Result |
|-----------|------------------|--------|--------|
| put(1,1) | 1 | Append Node(1,1) to bucket 1 | bucket[1] = [(1,1)] |
| put(2,2) | 2 | Append Node(2,2) to bucket 2 | bucket[2] = [(2,2)] |
| get(1)   | 1 | Scan bucket 1, find Node(1,1) | returns 1 |
| get(3)   | 3 | Scan empty bucket 3 | returns -1 |
| put(2,1) | 2 | Find Node(2,2) in bucket 2, update value | bucket[2] = [(2,1)] |
| get(2)   | 2 | Scan bucket 2, find updated Node(2,1) | returns 1 |
| remove(2)| 2 | Delete Node(2,1) from bucket 2 | bucket[2] = [] |
| get(2)   | 2 | Scan empty bucket 2 | returns -1 |

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) average for `put`, `get`, `remove`; O(n/SIZE) worst case when many keys collide |
| **Space** | O(N + SIZE) where N is number of stored key‑value pairs |

---

## Follow-Up Questions

1. How would you handle dynamic resizing when the load factor grows?
2. What alternative collision‑resolution strategies exist (e.g., open addressing)?
3. How could you extend this design to support `getAllKeys()` efficiently?

---

## Key Takeaway

> **Hash map internals: hash function → bucket index → collision resolution (chaining or open addressing). Understanding this is fundamental for system design and performance discussions.**