# 143. Reorder List

**Difficulty:** 🟡 Medium
**Acceptance:** 58.0%
**LeetCode:** [https://leetcode.com/problems/reorder-list](https://leetcode.com/problems/reorder-list)
**Companies:** Amazon, Apple, Arista Networks, Bloomberg, Goldman Sachs, Google, Infosys, Linkedin, Meta, Microsoft, Morgan Stanley, Nvidia, Oracle, Snapchat, Tcs, Tiktok

---

## 1. Problem Description

Given a linked list `L₀ → L₁ → ... → Lₙ₋₁ → Lₙ`, reorder it to `L₀ → Lₙ → L₁ → Lₙ₋₁ → L₂ → Lₙ₋₂ → ...`

---

## 2. Approach: Split + Reverse + Merge — O(n) ✅

Three steps:
1. Find the middle using slow/fast pointers.
2. Reverse the second half.
3. Merge the two halves alternately.

```text
FUNCTION reorderList(head):
    IF head == null: RETURN
    // Step 1: Find middle
    slow ← head
    fast ← head
    WHILE fast.next != null AND fast.next.next != null:
        slow ← slow.next
        fast ← fast.next.next
    // Step 2: Reverse second half
    second ← slow.next
    slow.next ← null
    prev ← null
    WHILE second != null:
        nxt ← second.next
        second.next ← prev
        prev ← second
        second ← nxt
    second ← prev
    // Step 3: Merge alternately
    first ← head
    WHILE second != null:
        tmp1 ← first.next
        tmp2 ← second.next
        first.next ← second
        second.next ← tmp1
        first ← tmp1
        second ← tmp2
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Examples

| Input List | Output List | Explanation |
|------------|-------------|-------------|
| `1→2→3→4` | `1→4→2→3` | Split at `2`, reverse `3→4` to `4→3`, then merge. |
| `1→2→3→4→5` | `1→5→2→4→3` | Middle is `3`; reverse `4→5` to `5→4` and interleave. |

---

## 4. Walkthrough

**Example:** `1→2→3→4→5`

| Step | Action |
|------|--------|
| Find middle | Slow stops at `3`, fast reaches end. |
| Split | First half: `1→2→3`, second half: `4→5`. |
| Reverse second half | `5→4`. |
| Merge | `1→5→2→4→3`. |

---

## 5. Complexity Analysis

- **Time:** O(n) – each node is visited a constant number of times.
- **Space:** O(1) – in‑place reordering using only a few pointers.

---

## 6. Follow-Up Questions

- How would you modify the algorithm to work with a doubly linked list?
- Can you reorder the list without altering the original node order (i.e., using extra space)?
- What changes are needed if the list is circular?

---

## Key Takeaway

> Combine three fundamental linked‑list operations – find middle (slow/fast), reverse, and merge – to achieve the required ordering in linear time and constant space.
