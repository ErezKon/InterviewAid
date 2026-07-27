# 2816. Double a Number Represented as a Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/double-a-number-represented-as-a-linked-list](https://leetcode.com/problems/double-a-number-represented-as-a-linked-list)
**Companies:** Amazon, Google, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach 1: Reverse, Double, Reverse](#approach-1-reverse-double-reverse--on-)
- [Approach 2: Single Pass (No Reverse)](#approach-2-single-pass-no-reverse--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given the `head` of a non-empty linked list representing a non-negative integer (most significant digit first), return the head of the list after **doubling** the number.

**Constraints:**
- Number of nodes: `[1, 10^4]`
- `0 <= Node.val <= 9`
- No leading zeros (except the number 0 itself)

---

## Examples

```
Input: head = [1,8,9]
Output: [3,7,8]
Explanation: 189 × 2 = 378

Input: head = [9,9,9]
Output: [1,9,9,8]
Explanation: 999 × 2 = 1998 → new head node needed for carry
```

---

## Key Insight

> Doubling processes digits right-to-left (carry propagation), but the list goes left-to-right. Two options: (1) **reverse**, process, reverse back, or (2) use a **single-pass trick** — if a digit ≥ 5, it will generate a carry, so propagate carry forward by checking the **next** node's value before processing.

---

## Approach 1: Reverse, Double, Reverse — O(n) ✅

```
FUNCTION doubleIt(head):
    head = REVERSE(head)
    carry = 0
    curr = head
    prev = NULL

    WHILE curr != NULL:
        val = curr.val * 2 + carry
        curr.val = val % 10
        carry = val / 10
        prev = curr
        curr = curr.next

    IF carry > 0:
        prev.next = NEW Node(carry)

    RETURN REVERSE(head)
```

---

## Approach 2: Single Pass (No Reverse) — O(n) ✅

```
FUNCTION doubleIt(head):
    IF head.val >= 5:
        head = NEW Node(0, head)    // placeholder for potential carry

    curr = head
    WHILE curr != NULL:
        curr.val = (curr.val * 2) % 10
        IF curr.next != NULL AND curr.next.val >= 5:
            curr.val += 1           // pre-add carry from next digit
        curr = curr.next

    RETURN head
```

**Why `>= 5`?** If `next.val >= 5`, then `next.val * 2 >= 10`, generating a carry of 1.

---

## Walkthrough

```
Approach 2 with head = [9,9,9]:

Step 0: 9 >= 5 → prepend 0 → [0,9,9,9]

curr=0: 0*2=0, next=9≥5 → 0+1=1 → [1,9,9,9]
curr=9: 9*2=18%10=8, next=9≥5 → 8+1=9 → [1,9,9,9]
curr=9: 9*2=18%10=8, next=9≥5 → 8+1=9 → [1,9,9,9]
curr=9: 9*2=18%10=8, no next → [1,9,9,8]

Result: [1,9,9,8] = 1998 ✅ (999 × 2)
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Reverse + Double | O(n) | O(1) |
| Single Pass | O(n) | O(1) |

---

## Follow-Up Questions

**Q1: Which approach would you prefer in an interview?**
> Single-pass is more elegant and shows deeper insight. But reverse approach is easier to get right and debug.

**Q2: What if we need to multiply by an arbitrary number, not just 2?**
> The reverse approach generalizes: reverse, multiply digit-by-digit with carry, reverse back. Single-pass trick doesn't generalize since the carry prediction depends on the multiplier.

**Q3: Could you use recursion instead of reversal?**
> Yes — recurse to the end, then process digits on the way back (stack gives you reversed order). Space becomes O(n) for the call stack.

---

## Key Takeaway

> **For linked list arithmetic with carries, either reverse the list first or use a forward-looking carry trick (digit ≥ 5 means it will generate a carry when doubled).**
