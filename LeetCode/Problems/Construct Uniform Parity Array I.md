# 3875. Construct Uniform Parity Array I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/construct-uniform-parity-array-i](https://leetcode.com/problems/construct-uniform-parity-array-i)
**Companies:** Amdocs, Google

---

## 1. Problem Description

Given an array and a target parity (all even or all odd), determine if you can make all elements the same parity by incrementing/decrementing elements by 1, with some constraints.

---

## 2. Examples

| nums | targetParity | Output | Explanation |
|------|--------------|--------|-------------|
| [2,4,6] | even | true | All numbers are already even.
| [1,3,5] | odd | true | All numbers are already odd.
| [1,2,3] | even | true | Increment 1→2, decrement 3→2, array becomes [2,2,2].
| [1,2,4] | odd | false | Even numbers cannot all become odd with a single ±1 change without breaking parity of others.

---

## 3. Approach: Check Parity Feasibility — O(n) ✅

```text
FUNCTION canMakeUniformParity(nums, targetParity):
    // targetParity: 0 for even, 1 for odd
    FOR each num IN nums:
        IF (num MOD 2) ≠ targetParity:
            // One ±1 operation flips parity, so check if allowed by constraints
            IF NOT canFlip(num):
                RETURN false
    RETURN true

FUNCTION canFlip(num):
    // In this problem any element can be incremented or decremented by 1 exactly once
    RETURN true
```

---

## 4. Walkthrough

Consider `nums = [1,2,3]` with target parity **even**.

1. Check each element:
   - 1 is odd → can be incremented to 2.
   - 2 is already even.
   - 3 is odd → can be decremented to 2.
2. After applying the allowed ±1 changes, the array becomes `[2,2,2]`, all even.
3. Since every element could reach the target parity, return **true**.

---

## 5. Complexity Analysis

- **Time:** O(n) – a single pass over the array.
- **Space:** O(1) – only constant extra variables.

---

## 6. Follow-Up Questions

- How would the solution change if each element could be changed by any integer amount, not just ±1?
- What if the operation cost varies per element; can you minimize total cost to achieve uniform parity?
- How does the problem differ when the array is extremely large (e.g., streaming input) and you cannot store it entirely in memory?

---

## Key Takeaway

> Parity problems often reduce to counting: can all elements reach even (or odd) within the allowed operations?
