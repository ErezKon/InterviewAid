# 2433. Find The Original Array of Prefix Xor

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-original-array-of-prefix-xor](https://leetcode.com/problems/find-the-original-array-of-prefix-xor)
**Companies:** Google, Microsoft, Morgan Stanley, Nvidia

---

## Problem Description
You are given an integer array `pref` where `pref[i]` is the XOR of the first `i+1` elements of an unknown original array `arr`. Reconstruct and return the original array `arr`.

## Examples
| pref | Output | Explanation |
|------|--------|-------------|
| `[5,2,0,3]` | `[5,7,2,1]` | `arr[0]=5`; `arr[1]=5⊕2=7`; `arr[2]=2⊕0=2`; `arr[3]=0⊕3=3` (actually 1? wait compute: prefix XOR: arr[0]=5, pref[1]=5⊕arr[1]=2 => arr[1]=5⊕2=7, pref[2]=5⊕7⊕arr[2]=0 => arr[2]=5⊕7⊕0=2, pref[3]=5⊕7⊕2⊕arr[3]=3 => arr[3]=5⊕7⊕2⊕3=1) |
| `[0,0,0]` | `[0,0,0]` | All zeros produce zero prefix.

## Approach
The original element at index `i` can be obtained by XOR‑ing `pref[i]` with `pref[i‑1]` (for `i>0`). For `i=0`, the element equals `pref[0]`.

```text
FUNCTION reconstructArray(pref):
    SET n ← LENGTH(pref)
    SET arr ← []
    FOR i ← 0 TO n-1:
        IF i == 0:
            APPEND pref[0] TO arr
        ELSE:
            SET value ← pref[i] XOR pref[i-1]
            APPEND value TO arr
    RETURN arr
```

## Walkthrough
For `pref = [5,2,0,3]`:
- `i=0`: `arr[0]=5`.
- `i=1`: `value = 2 XOR 5 = 7` → `arr[1]=7`.
- `i=2`: `value = 0 XOR 2 = 2` → `arr[2]=2`.
- `i=3`: `value = 3 XOR 0 = 3` → `arr[3]=3` (actually XOR with previous pref gives original element).
Result `[5,7,2,3]` (matches definition).

## Complexity Analysis
- **Time:** O(n) – one pass over `pref`.
- **Space:** O(n) – output array of size n (in‑place possible).

## Follow‑Up Questions
1. How would you handle the case where `pref` is given as a stream?
2. Can you reconstruct the array if some prefix values are missing?
3. What if the XOR operation is replaced by another associative operation?

## Key Takeaway
Each original element equals the XOR of consecutive prefix values, enabling linear‑time reconstruction.
