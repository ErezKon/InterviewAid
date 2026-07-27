# Kadane's Algorithm Variants

Related: #53, #152, #918, #1186

---

## Table of Contents
- [Overview](#overview)
- [Variant Comparison](#variant-comparison)
- [Template](#template)
- [Key Takeaway](#key-takeaway)

---

## Overview

Kadane's algorithm extends to several subarray optimization problems by tracking different running values.

---

## Variant Comparison

| Problem | Track | Recurrence |
|---------|-------|-----------|
| Max Subarray (#53) | curMax | `max(num, curMax + num)` |
| Max Product (#152) | curMax, curMin | Swap on negative |
| Max Circular (#918) | curMax, curMin | `max(kadane, total - minKadane)` |
| Max Abs Sum (#1186) | curMax, curMin | `max(abs(curMax), abs(curMin))` |

---

## Template

### Max Product Subarray

```
FUNCTION maxProduct(nums)
    maxP ← minP ← result ← nums[0]
    FOR i ← 1 TO n-1 DO
        IF nums[i] < 0 THEN SWAP(maxP, minP)
        maxP ← MAX(nums[i], maxP × nums[i])
        minP ← MIN(nums[i], minP × nums[i])
        result ← MAX(result, maxP)
    RETURN result
END FUNCTION
```

---

## Key Takeaway

> **Kadane's family** — all variants follow the same pattern: maintain running aggregates (max, min, or both) and decide at each step whether to extend the current subarray or start fresh. The specific aggregates tracked depend on the operation (sum vs product) and the objective (max, circular, absolute).
