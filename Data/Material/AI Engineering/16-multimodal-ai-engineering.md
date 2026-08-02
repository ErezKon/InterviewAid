## 1. Multimodal AI Engineering

### Table of Contents

- [1.1 Vision + Language](#11-vision-language)


### 1.1 Vision + Language

```python
from openai import OpenAI
import base64
from pathlib import Path


def analyze_image(
    image_path: str,
    question: str,
    model: str = "gpt-4o",
) -> str:
    """Analyze an image with a vision-language model."""
    client = OpenAI()

    # Encode image to base64
    image_data = Path(image_path).read_bytes()
    b64_image = base64.b64encode(image_data).decode("utf-8")
    mime_type = "image/png" if image_path.endswith(".png") else "image/jpeg"

    response = client.chat.completions.create(
        model=model,
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": question},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:{mime_type};base64,{b64_image}",
                            "detail": "high",   # "low", "high", or "auto"
                        },
                    },
                ],
            }
        ],
        max_tokens=1024,
    )

    return response.choices[0].message.content


# Document understanding pipeline
def extract_document_data(image_path: str) -> dict:
    """Extract structured data from a document image (invoice, receipt, etc.)."""
    from pydantic import BaseModel

    class InvoiceData(BaseModel):
        vendor_name: str
        invoice_number: str
        date: str
        line_items: list[dict]
        subtotal: float
        tax: float
        total: float

    client = OpenAI()
    image_data = Path(image_path).read_bytes()
    b64_image = base64.b64encode(image_data).decode("utf-8")

    response = client.responses.parse(
        model="gpt-4o",
        input=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Extract all invoice data from this image.",
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/png;base64,{b64_image}"
                        },
                    },
                ],
            }
        ],
        text_format=InvoiceData,
    )

    return response.output_parsed.model_dump()
```

---

