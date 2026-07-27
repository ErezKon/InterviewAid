# 716. Max Stack

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/max-stack](https://leetcode.com/problems/max-stack)
**Companies:** Amazon, Google, Linkedin, Lyft, Meta, Nutanix, Oracle, Tiktok, Walmart Labs, Woven By Toyota

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Doubly Linked List + TreeMap — O(log n)](#approach-doubly-linked-list--treemap--olog-n-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Design a max stack data structure that supports:
- `push(x)` — Push element x onto stack.
- `pop()` — Remove and return the element on top of the stack.
- `top()` — Get the element on top without removing.
- `peekMax()` — Retrieve the maximum element without removing.
- `popMax()` — Retrieve and remove the maximum element. If there are multiple max elements, remove the one closest to the top.

**Constraints:**
- `-10⁷ ≤ x ≤ 10⁷`
- At most `10⁵` calls total.

---

## Examples

```
MaxStack stk = new MaxStack();
stk.push(5);    // stack: [5]
stk.push(1);    // stack: [5, 1]
stk.push(5);    // stack: [5, 1, 5]
stk.top();      // → 5
stk.popMax();   // → 5 (topmost 5 removed), stack: [5, 1]
stk.top();      // → 1
stk.peekMax();  // → 5
stk.pop();      // → 1, stack: [5]
stk.top();      // → 5
```

---

## Key Insight

> The challenge is `popMax()` — removing an element from the **middle** of the stack in O(log n). A regular stack can't do this. Use a **doubly linked list** (DLL) for the stack (O(1) removal of any node given its reference) combined with a **balanced BST / TreeMap** mapping values to their DLL nodes for O(log n) max lookup.

```
DLL:     ← [5] ↔ [1] ↔ [5] →      (stack order, O(1) remove by node)
TreeMap: { 1: [node₁], 5: [node₀, node₂] }  (sorted, O(log n) max)
```

---

## Approach: Doubly Linked List + TreeMap — O(log n) ✅

DLL for O(1) push/pop/remove, TreeMap for O(log n) max tracking.

```
CLASS MaxStack:
    CONSTRUCTOR:
        dll = DoublyLinkedList()
        treeMap = SortedDict()    // val → list of DLL nodes

    FUNCTION push(x):
        node = dll.ADD_LAST(x)
        treeMap.setdefault(x, []).ADD(node)

    FUNCTION pop():
        node = dll.REMOVE_LAST()
        treeMap[node.val].REMOVE(node)
        IF treeMap[node.val] is empty: DELETE treeMap[node.val]
        RETURN node.val

    FUNCTION top():
        RETURN dll.LAST().val

    FUNCTION peekMax():
        RETURN treeMap.LAST_KEY()

    FUNCTION popMax():
        maxVal = treeMap.LAST_KEY()
        node = treeMap[maxVal].POP()
        IF treeMap[maxVal] is empty: DELETE treeMap[maxVal]
        dll.REMOVE(node)
        RETURN maxVal
```

---

## Walkthrough

```
push(5) → DLL: [5],       TreeMap: {5: [n₀]}
push(1) → DLL: [5,1],     TreeMap: {1: [n₁], 5: [n₀]}
push(5) → DLL: [5,1,5],   TreeMap: {1: [n₁], 5: [n₀,n₂]}

popMax():
  maxVal = 5, pop last node from TreeMap[5] → n₂
  Remove n₂ from DLL → DLL: [5,1]
  TreeMap: {1: [n₁], 5: [n₀]}
  Return 5

top() → DLL.LAST = 1 ✅
```

---

## Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| push      | **O(log n)** | O(n) |
| pop       | **O(log n)** | — |
| top       | **O(1)** | — |
| peekMax   | **O(log n)** | — |
| popMax    | **O(log n)** | — |

---

## Follow-Up Questions

**Q1: Can you achieve O(1) for all operations?**
Not for `popMax` in general — finding and removing the max requires some ordering structure, which costs at least O(log n). A simpler two-stack approach gives O(n) for `popMax`.

**Q2: What's the simpler two-stack approach?**
Keep a main stack and a max-tracking stack. For `popMax`, pop elements from the main stack into a temp buffer until you find the max, then push them back. This is O(n) per `popMax` but O(1) for everything else.

**Q3: Why use a list of nodes in the TreeMap instead of a single node?**
Duplicate values can be pushed multiple times. We need to track all nodes with the same value and remove the most recently pushed one (closest to top) during `popMax`.

---

## Key Takeaway

> **Combining a doubly linked list with a balanced BST gives O(log n) for all operations including `popMax`.** The DLL provides O(1) arbitrary node removal; the BST provides O(log n) max tracking. This dual-structure pattern appears whenever you need both order-based and value-based access.
