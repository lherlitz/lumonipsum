import { useEffect, useState, useCallback } from 'react';

interface MDRNumbersProps {
  className?: string;
}

interface Position {
  x: number;
  y: number;
}

export default function MDRNumbers({ className = '' }: MDRNumbersProps) {
  const [rows, setRows] = useState<string[]>([]);
  const [opacities, setOpacities] = useState<number[][]>([]);
  const [positions, setPositions] = useState<Position[][]>([]);
  const [charsPerRow, setCharsPerRow] = useState(15);
  const numRows = 11;
  const maxOffset = 5.5; // Increased maximum pixel offset for more movement
  const updateInterval = 1500; // Increased interval for slower movement
  const baseCharWidth = 22; // Adjusted width including letter-spacing (0.95rem)

  // Calculate appropriate number of columns based on viewport width
  const calculateColumns = useCallback(() => {
    if (typeof window === 'undefined') return 15; // Default for SSR
    
    // Calculate available width (subtracting padding and margins)
    const containerWidth = window.innerWidth - 200; // Increased padding buffer to prevent overflow
    
    // Calculate columns based on character width with spacing
    const columns = Math.floor(containerWidth / baseCharWidth);
    
    // Subtract 1 from calculated columns to reduce crowding and ensure they stay in bounds
    // Clamp between min and max columns
    return Math.max(10, Math.min(35, columns - 1));
  }, []);

  // Handle viewport resize
  useEffect(() => {
    const handleResize = () => {
      const newCharsPerRow = calculateColumns();
      if (newCharsPerRow !== charsPerRow) {
        console.log(`Updating columns from ${charsPerRow} to ${newCharsPerRow}`);
        setCharsPerRow(newCharsPerRow);
      }
    };

    // Initial calculation
    handleResize();

    // Set up resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [charsPerRow, calculateColumns]); // Add dependencies to ensure proper updates

  // Generate a random row of digits
  const generateRandomRow = useCallback((length: number) => {
    let row = '';
    for (let i = 0; i < length; i++) {
      row += Math.floor(Math.random() * 10).toString();
    }
    return row;
  }, []);

  // Initialize and update digits
  useEffect(() => {
    // Generate initial opacities
    const generateInitialOpacities = () => {
      return Array(numRows).fill(0).map(() => 
        Array(charsPerRow).fill(0).map(() => Math.random() * 0.2 + 0.8)
      );
    };

    // Generate initial positions
    const generateInitialPositions = () => {
      return Array(numRows).fill(0).map(() => 
        Array(charsPerRow).fill(0).map(() => ({
          x: (Math.random() * 2 - 1) * maxOffset,
          y: (Math.random() * 2 - 1) * maxOffset
        }))
      );
    };

    // Generate initial rows or update existing ones
    setRows(Array(numRows).fill(0).map(() => generateRandomRow(charsPerRow)));
    setOpacities(generateInitialOpacities());
    setPositions(generateInitialPositions());

    // Update effects periodically
    const interval = setInterval(() => {
      // Gradually update opacities
      setOpacities(prev => {
        const newOpacities = [...prev];
        // Update a few random opacities
        for (let i = 0; i < 5; i++) {
          const row = Math.floor(Math.random() * numRows);
          const col = Math.floor(Math.random() * charsPerRow);
          if (newOpacities[row] && newOpacities[row][col] !== undefined) {
            newOpacities[row][col] = Math.random() * 0.2 + 0.8;
          }
        }
        return newOpacities;
      });
      
      // Gradually update positions
      setPositions(prev => {
        const newPositions = [...prev];
        // Update a few random positions
        for (let i = 0; i < 8; i++) {
          const row = Math.floor(Math.random() * numRows);
          const col = Math.floor(Math.random() * charsPerRow);
          if (newPositions[row] && newPositions[row][col]) {
            newPositions[row][col] = {
              x: (Math.random() * 2 - 1) * maxOffset,
              y: (Math.random() * 2 - 1) * maxOffset
            };
          }
        }
        return newPositions;
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [charsPerRow, generateRandomRow]); // Re-run when charsPerRow changes

  return (
    <div className={`generated-text font-mono ${className}`}>
      <div className="p-4 w-full">
        {rows.map((row, i) => (
          <div 
            key={`row-${i}`} 
            className="mb-2" 
            style={{
              letterSpacing: '0.95rem',
              paddingLeft: '0.4rem',
              paddingRight: '0.4rem',
              textAlign: 'justify',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            {row.split('').map((char, j) => (
              <span
                key={`${i}-${j}`}
                style={{
                  opacity: opacities[i]?.[j] || 0.9,
                  transition: 'opacity 1.5s ease-in-out, transform 2s ease-in-out',
                  transform: `translate(${positions[i]?.[j]?.x || 0}px, ${positions[i]?.[j]?.y || 0}px)`,
                  display: 'inline-block'
                }}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
} 