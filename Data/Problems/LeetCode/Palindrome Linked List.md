# 234. Palindrome Linked List

**Difficulty:** 🟢 Easy
**Acceptance:** 54.0%
**LeetCode:** [https://leetcode.com/problems/palindrome-linked-list](https://leetcode.com/problems/palindrome-linked-list)
**Companies:** Amazon, Amd, Bloomberg, Ebay, Google, Infosys, Intel, Ixl, Meta, Microsoft, Morgan Stanley, Nvidia, Oracle, Sap, Servicenow, Yandex

---

## 1. Problem Description

Given the `head` of a singly linked list, return `true` *if it is a **palindrome** or* `false` *otherwise*.

**Constraints:**

- The number of nodes in the list is in the range `[1, 10^5]`.
- `0 <= Node.val <= 9`

**Follow up:** Could you do it in `O(n)` time and `O(1)` space?

---

## 2. Examples

```
Example 1:
  Input: head = [1,2,2,1]
  Output: true
```

```
Example 2:
  Input: head = [1,2]
  Output: false
```

---

## 3. Approach: Reverse Second Half — O(n), O(1) ✅

```text
FUNCTION isPalindrome(head):
    // Step 1: Find middle using slow/fast pointers
    SET slow ← head
    SET fast ← head
    WHILE fast IS NOT NULL AND fast.next IS NOT NULL:
        SET slow ← slow.next
        SET fast ← fast.next.next

    // Step 2: Reverse the second half of the list
    SET prev ← NULL
    WHILE slow IS NOT NULL:
        SET next ← slow.next
        SET slow.next ← prev
        SET prev ← slow
        SET slow ← next

    // Step 3: Compare the first half with the reversed second half
    SET left ← head
    SET right ← prev
    WHILE right IS NOT NULL:
        IF left.val ≠ right.val:
            RETURN false
        SET left ← left.next
        SET right ← right.next

    RETURN true
```

---

## 4. Walkthrough

Consider the list `1 → 2 → 2 → 1`.

1. **Find middle**: slow stops at the third node (`2`), fast reaches `null`.
2. **Reverse second half**: nodes `2 → 1` become `1 → 2`.
3. **Compare**:
   - left=`1`, right=`1` → match.
   - left=`2`, right=`2` → match.
   All nodes match, so return `true`.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) – one pass to find middle, one pass to reverse, one pass to compare | O(1) – only a few pointers are used |

---

## 6. Follow-Up Questions

- How would you restore the list to its original order after the check?
- Can you solve the problem using O(n) extra space?
- How would the solution change for a doubly linked list?

---

## Key Takeaway

> Combines three fundamental operations: find middle (slow/fast), reverse list (iterative), compare sequences. Optionally restore the list by reversing the second half again.
