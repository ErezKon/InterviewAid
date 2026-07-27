# 706. Design HashMap

**Difficulty:** 🟢 Easy
**Acceptance:** 65.0%
**LeetCode:** [https://leetcode.com/problems/design-hashmap](https://leetcode.com/problems/design-hashmap)
**Companies:** Amazon, Apple, Couchbase, Goldman Sachs, Google, Linkedin, Meta, Microsoft, Oracle, Palo Alto Networks, Servicenow, Snowflake, Tiktok, Tripactions

---

## 1. Problem Description

Design a HashMap without using built-in hash table libraries. Implement `put(key, value)`, `get(key)`, `remove(key)`.

---

## 2. Approach: Array of Linked Lists (Chaining) ✅

```
CLASS MyHashMap:
    SIZE = 1000

    CONSTRUCTOR:
        buckets = array of SIZE empty linked lists

    FUNCTION hash(key):
        RETURN key % SIZE

    FUNCTION put(key, value):
        idx = hash(key)
        FOR node IN buckets[idx]:
            IF node.key == key:
                node.value = value
                RETURN
        buckets[idx].ADD(Node(key, value))

    FUNCTION get(key):
        idx = hash(key)
        FOR node IN buckets[idx]:
            IF node.key == key: RETURN node.value
        RETURN -1

    FUNCTION remove(key):
        idx = hash(key)
        REMOVE node with node.key == key from buckets[idx]
```

Average O(1), worst O(n/SIZE) per operation.

---

## Key Takeaway

> Hash map internals: hash function → bucket index → collision resolution (chaining or open addressing). Understanding this is fundamental for system design and performance discussions.
