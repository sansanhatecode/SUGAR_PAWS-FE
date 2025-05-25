import React, { useState } from "react";
import {
  Button,
  TextInput,
  Textarea,
  Group,
  Select,
  Modal,
  MultiSelect,
} from "@mantine/core";
import { Product } from "@/types/product";

const BLOCK_TYPES = [
  { value: "paragraph", label: "Paragraph" },
  { value: "heading", label: "Heading" },
  { value: "table", label: "Table" },
  { value: "quote", label: "Quote" },
];

type DescBlock =
  | { type: "paragraph"; value: string }
  | { type: "heading"; value: string }
  | { type: "quote"; value: string }
  | { type: "table"; value: string };

interface EditProductModalProps {
  opened: boolean;
  onClose: () => void;
  product: Product | null;
  onSubmit: (data: {
    name: string;
    description: string;
    vendor?: string;
    tags?: string[];
  }) => void;
}

const parseHtmlBlocks = (html: string): DescBlock[] => {
  const blocks: DescBlock[] = [];
  if (!html) return blocks;
  const div = document.createElement("div");
  div.innerHTML = html;
  div.childNodes.forEach((node) => {
    if (node.nodeType === 1) {
      const el = node as HTMLElement;
      if (el.tagName === "P") {
        // Extract only plain text for editing
        blocks.push({ type: "paragraph", value: el.innerText });
      } else if (el.tagName === "H2") {
        blocks.push({ type: "heading", value: el.innerText });
      } else if (el.tagName === "BLOCKQUOTE") {
        // For blockquote, get text content (strip inner tags)
        blocks.push({ type: "quote", value: el.innerText });
      } else if (el.tagName === "TABLE") {
        blocks.push({ type: "table", value: el.outerHTML });
      }
    }
  });
  return blocks;
};

// Helper for table block
function parseTable(html: string): string[][] {
  if (!html) return [[""]];
  const div = document.createElement("div");
  div.innerHTML = html;
  const table = div.querySelector("table");
  if (!table) return [[""]];
  return Array.from(table.rows).map((row) =>
    Array.from(row.cells).map((cell) => cell.innerText),
  );
}
function tableToHtml(data: string[][]): string {
  return (
    '<table style="width: 100%;">' +
    data
      .map(
        (row) =>
          "<tr>" +
          row.map((cell) => `<td>${cell || "&nbsp;"}</td>`).join("") +
          "</tr>",
      )
      .join("") +
    "</table>"
  );
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  opened,
  onClose,
  product,
  onSubmit,
}) => {
  const [name, setName] = useState(product?.name || "");
  const [vendor, setVendor] = useState(product?.vendor || "");
  const [tags, setTags] = useState<string[]>(product?.tags || []);
  const [descBlocks, setDescBlocks] = useState<DescBlock[]>(() =>
    parseHtmlBlocks(product?.description || ""),
  );
  // Table state for each table block
  const [tableStates, setTableStates] = useState<Record<number, string[][]>>(
    {},
  );

  const addBlock = (type: DescBlock["type"]) => {
    setDescBlocks((prev) => [...prev, { type, value: "" } as DescBlock]);
  };

  const removeBlock = (idx: number) => {
    setDescBlocks((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateBlock = (idx: number, value: string) => {
    setDescBlocks((prev) =>
      prev.map((b, i) => (i === idx ? { ...b, value } : b)),
    );
  };

  const changeBlockType = (idx: number, type: DescBlock["type"]) => {
    setDescBlocks((prev) =>
      prev.map((b, i) => (i === idx ? ({ type, value: "" } as DescBlock) : b)),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description: blocksToHtml(descBlocks),
      vendor,
      tags,
    });
  };

  // Sync tableStates when opening modal or switching product
  React.useEffect(() => {
    if (opened && product) {
      setName(product.name || "");
      setVendor(product.vendor || "");
      setTags(product.tags || []);
      setDescBlocks(parseHtmlBlocks(product.description || ""));
      // Parse all table blocks
      const newTableStates: Record<number, string[][]> = {};
      parseHtmlBlocks(product.description || "").forEach((block, idx) => {
        if (block.type === "table") {
          newTableStates[idx] = parseTable(block.value);
        }
      });
      setTableStates(newTableStates);
    }
  }, [opened, product]);

  // Table block UI
  function renderTableEditor(idx: number) {
    const data = tableStates[idx] || [[""]];
    const updateCell = (rowIdx: number, colIdx: number, value: string) => {
      setTableStates((prev) => ({
        ...prev,
        [idx]: prev[idx].map((row, r) =>
          r === rowIdx
            ? row.map((cell, c) => (c === colIdx ? value : cell))
            : row,
        ),
      }));
    };
    const addRow = () => {
      setTableStates((prev) => ({
        ...prev,
        [idx]: [
          ...(prev[idx] || []),
          Array(prev[idx]?.[0]?.length || 1).fill(""),
        ],
      }));
    };
    const addCol = () => {
      setTableStates((prev) => ({
        ...prev,
        [idx]: (prev[idx] || []).map((row) => [...row, ""]),
      }));
    };
    const removeRow = (rowIdx: number) => {
      setTableStates((prev) => ({
        ...prev,
        [idx]: prev[idx].filter((_, r) => r !== rowIdx),
      }));
    };
    const removeCol = (colIdx: number) => {
      setTableStates((prev) => ({
        ...prev,
        [idx]: (prev[idx] || []).map((row) =>
          row.filter((_, c) => c !== colIdx),
        ),
      }));
    };
    return (
      <div className="overflow-x-auto">
        <table className="border border-gray-300 w-full mb-2">
          <tbody>
            {data.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, colIdx) => (
                  <td key={colIdx} className="border p-1">
                    <input
                      className="border px-1 py-0.5 w-24"
                      value={cell}
                      onChange={(e) =>
                        updateCell(rowIdx, colIdx, e.target.value)
                      }
                    />
                    {rowIdx === 0 && data[0].length > 1 && (
                      <button
                        type="button"
                        className="ml-1 text-xs text-red-500"
                        onClick={() => removeCol(colIdx)}
                        title="Remove column"
                      >
                        ×
                      </button>
                    )}
                  </td>
                ))}
                {row.length > 0 && (
                  <td>
                    <button
                      type="button"
                      className="text-xs text-red-500"
                      onClick={() => removeRow(rowIdx)}
                      title="Remove row"
                    >
                      ×
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-2 mb-2">
          <Button size="xs" variant="light" onClick={addRow} type="button">
            + Row
          </Button>
          <Button size="xs" variant="light" onClick={addCol} type="button">
            + Column
          </Button>
        </div>
      </div>
    );
  }

  // Update blocksToHtml to use tableStates for table blocks
  const blocksToHtml = (blocks: DescBlock[]): string => {
    return blocks
      .map((block, idx) => {
        if (block.type === "paragraph") return `<p>${block.value}</p>`;
        if (block.type === "heading") return `<h2>${block.value}</h2>`;
        if (block.type === "quote")
          return `<blockquote><p>${block.value}</p></blockquote>`;
        if (block.type === "table")
          return tableToHtml(tableStates[idx] || [[""]]);
        return "";
      })
      .join("");
  };

  React.useEffect(() => {
    if (opened && product) {
      setName(product.name || "");
      setVendor(product.vendor || "");
      setTags(product.tags || []);
      setDescBlocks(parseHtmlBlocks(product.description || ""));
    }
  }, [opened, product]);

  return (
    <Modal opened={opened} onClose={onClose} title="Edit Product" size="lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput
          label="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter product name"
        />
        <TextInput
          label="Vendor"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          placeholder="Enter vendor name"
          description="Company or brand that manufactures this product"
        />
        <MultiSelect
          label="Tags"
          data={tags.map((tag) => ({ value: tag, label: tag }))}
          value={tags}
          placeholder="Enter or select tags"
          searchable
          creatable
          getCreateLabel={(query) => `+ Create "${query}"`}
          onCreate={(query) => {
            const item = { value: query, label: query };
            if (!tags.includes(query)) {
              setTags((current) => [...current, query]);
            }
            return item;
          }}
          onChange={(values) => setTags(values)}
          description="Product categories or search keywords (e.g. 'organic', 'gluten-free', 'dog food')"
        />
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Product Description</span>
            <Group spacing={4}>
              {BLOCK_TYPES.map((t) => (
                <Button
                  key={t.value}
                  size="xs"
                  variant="light"
                  onClick={(e) => {
                    e.preventDefault();
                    addBlock(t.value as DescBlock["type"]);
                  }}
                >
                  + {t.label}
                </Button>
              ))}
            </Group>
          </div>
          <div className="text-xs text-gray-500 mb-2">
            <ul className="list-disc ml-4">
              <li>Paragraph: For normal text blocks.</li>
              <li>Heading: For section titles.</li>
              <li>Quote: For highlighted quotes or notes.</li>
              <li>
                Table: Paste HTML table or copy from Excel/Word (use{" "}
                <b>Paste as HTML</b> if possible).
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            {descBlocks.map((block, idx) => (
              <div key={idx} className="border rounded p-2 bg-gray-50 relative">
                <Group spacing={4} className="mb-1">
                  <Select
                    data={BLOCK_TYPES}
                    value={block.type}
                    onChange={(v) =>
                      v && changeBlockType(idx, v as DescBlock["type"])
                    }
                    size="xs"
                    style={{ width: 120 }}
                  />
                  <Button
                    size="xs"
                    color="red"
                    variant="subtle"
                    onClick={() => removeBlock(idx)}
                  >
                    Delete
                  </Button>
                </Group>
                {block.type === "paragraph" && (
                  <Textarea
                    placeholder="Enter paragraph text..."
                    value={block.value}
                    onChange={(e) => updateBlock(idx, e.target.value)}
                    autosize
                    minRows={2}
                  />
                )}
                {block.type === "heading" && (
                  <TextInput
                    placeholder="Enter heading..."
                    value={block.value}
                    onChange={(e) => updateBlock(idx, e.target.value)}
                  />
                )}
                {block.type === "quote" && (
                  <Textarea
                    placeholder="Enter quote..."
                    value={block.value}
                    onChange={(e) => updateBlock(idx, e.target.value)}
                    autosize
                    minRows={2}
                  />
                )}
                {block.type === "table" && renderTableEditor(idx)}
              </div>
            ))}
          </div>
        </div>
        <Button type="submit" variant="filled">
          Save Changes
        </Button>
      </form>
    </Modal>
  );
};

export default EditProductModal;
