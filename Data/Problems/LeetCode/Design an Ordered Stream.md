# 1656. Design an Ordered Stream

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/design-an-ordered-stream](https://leetcode.com/problems/design-an-ordered-stream)
**Companies:** Bloomberg, Meta, Yandex

---

## Problem Description

There is a stream of `n` `(idKey, value)` pairs arriving in an **arbitrary** order, where `idKey` is an integer between `1` and `n` and `value` is a string. No two pairs have the same `id`.

Design a stream that returns the values in **increasing order of their IDs** by returning a **chunk** (list) of values after each insertion. The concatenation of all the **chunks** should result in a list of the sorted values.

Implement the `OrderedStream` class:

- `OrderedStream(int n)` Constructs the stream to take `n` values.
- `String[] insert(int idKey, String value)` Inserts the pair `(idKey, value)` into the stream, then returns the **largest possible chunk** of currently inserted values that appear next in the order.

**Constraints:**
- `1 <= n <= 1000`
- `1 <= id <= n`
- `value.length == 5`
- `value` consists only of lowercase letters.
- Each call to `insert` will have a unique `id`.
- Exactly `n` calls will be made to `insert`.

---

## Examples

```
Example 1:
  Input:
  ["OrderedStream", "insert", "insert", "insert", "insert", "insert"]
  [[5], [3, "ccccc"], [1, "aaaaa"], [2, "bbbbb"], [5, "eeeee"], [4, "ddddd"]]
  Output:
  [null, [], ["aaaaa"], ["bbbbb", "ccccc"], [], ["ddddd", "eeeee"]]
  Explanation:
  // Note that the values ordered by ID is ["aaaaa", "bbbbb", "ccccc", "ddddd", "eeeee"].
  OrderedStream os = new OrderedStream(5);
  os.insert(3, "ccccc"); // Inserts (3, "ccccc"), returns [].
  os.insert(1, "aaaaa"); // Inserts (1, "aaaaa"), returns ["aaaaa"].
  os.insert(2, "bbbbb"); // Inserts (2, "bbbbb"), returns ["bbbbb", "ccccc"].
  os.insert(5, "eeeee"); // Inserts (5, "eeeee"), returns [].
  os.insert(4, "ddddd"); // Inserts (4, "ddddd"), returns ["ddddd", "eeeee"].
  // Concatentating all the chunks returned:
  // [] + ["aaaaa"] + ["bbbbb", "ccccc"] + [] + ["ddddd", "eeeee"] = ["aaaaa", "bbbbb", "ccccc", "ddddd", "eeeee"]
  // The resulting order is the same as the order above.
```

---

## Approach

```
FUNCTION buildOrderedStream(n):
    SET stream ← array of size n+1 filled with null
    SET ptr ← 1
    RETURN OBJECT with methods insert and internal state

METHOD insert(idKey, value):
    SET stream[idKey] ← value
    SET result ← []
    WHILE ptr ≤ n AND stream[ptr] IS NOT null:
        APPEND stream[ptr] TO result
        INCREMENT ptr
    RETURN result
```

---

## Walkthrough

**Step‑by‑step for the sequence above:**

| Operation | Stream state (index→value) | ptr | Returned |
|-----------|---------------------------|-----|----------|
| `insert(3, "ccccc")` | 1→null, 2→null, 3→"ccccc" | 1 | `[]` |
| `insert(1, "aaaaa")` | 1→"aaaaa", 2→null, 3→"ccccc" | 1→2 | `["aaaaa"]` |
| `insert(2, "bbbbb")` | 1→"aaaaa", 2→"bbbbb", 3→"ccccc" | 2→4 | `["bbbbb", "ccccc"]` |

The pointer only moves forward, collecting consecutive filled slots.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) amortized total across all inserts |
| **Space** | O(n) |

---

## Follow-Up Questions

1. How would you modify the design to support deletion of an id?
2. Can you implement the stream with a balanced BST to allow out‑of‑order retrieval without a pointer?

---

## Key Takeaway

> **Pointer‑based ordered stream:** store values at their ID, advance a pointer through consecutive filled slots on each insert. Amortized O(1) per insert since the pointer only moves forward.
