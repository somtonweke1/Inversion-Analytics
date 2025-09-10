import { z } from 'zod'

export const dataSubmissionSchema = z.object({
  // System Configuration
  systemType: z.enum(['Fixed Bed', 'Fluidized Bed'], {
    message: 'System type is required'
  }),
  vesselDiameter: z.number().min(0.1, 'Vessel diameter must be at least 0.1m').max(10, 'Vessel diameter must be less than 10m'),
  vesselHeight: z.number().min(0.1, 'Vessel height must be at least 0.1m').max(20, 'Vessel height must be less than 20m'),
  flowRate: z.number().min(0.1, 'Flow rate must be at least 0.1 m³/h').max(10000, 'Flow rate must be less than 10,000 m³/h'),
  bedHeight: z.number().min(0.1, 'Bed height must be at least 0.1m').max(10, 'Bed height must be less than 10m'),
  vesselVolume: z.number().min(0.001, 'Vessel volume must be at least 0.001 m³').max(1000, 'Vessel volume must be less than 1,000 m³'),
  bedVolume: z.number().min(0.001, 'Bed volume must be at least 0.001 m³').max(500, 'Bed volume must be less than 500 m³'),
  ebct: z.number().min(0.1, 'EBCT must be at least 0.1 minutes').max(60, 'EBCT must be less than 60 minutes'),
  
  // Water Quality Parameters
  toc: z.number().min(0, 'TOC must be non-negative').max(100, 'TOC must be less than 100 mg/L'),
  sulfate: z.number().min(0, 'Sulfate must be non-negative').max(1000, 'Sulfate must be less than 1,000 mg/L'),
  chloride: z.number().min(0, 'Chloride must be non-negative').max(1000, 'Chloride must be less than 1,000 mg/L'),
  alkalinity: z.number().min(0, 'Alkalinity must be non-negative').max(500, 'Alkalinity must be less than 500 mg/L as CaCO3'),
  hardness: z.number().min(0, 'Hardness must be non-negative').max(1000, 'Hardness must be less than 1,000 mg/L as CaCO3'),
  ph: z.number().min(4, 'pH must be at least 4').max(12, 'pH must be at most 12'),
  temperature: z.number().min(0, 'Temperature must be at least 0°C').max(50, 'Temperature must be at most 50°C'),
  
  // PFAS Concentrations (ng/L)
  pfoaConcentration: z.number().min(0, 'PFOA concentration must be non-negative').max(10000, 'PFOA concentration must be less than 10,000 ng/L'),
  pfosConcentration: z.number().min(0, 'PFOS concentration must be non-negative').max(10000, 'PFOS concentration must be less than 10,000 ng/L'),
  pfnaConcentration: z.number().min(0, 'PFNA concentration must be non-negative').max(10000, 'PFNA concentration must be less than 10,000 ng/L'),
  pfhxaConcentration: z.number().min(0, 'PFHxA concentration must be non-negative').max(10000, 'PFHxA concentration must be less than 10,000 ng/L'),
  pfhxsConcentration: z.number().min(0, 'PFHxS concentration must be non-negative').max(10000, 'PFHxS concentration must be less than 10,000 ng/L'),
  pfdaConcentration: z.number().min(0, 'PFDA concentration must be non-negative').max(10000, 'PFDA concentration must be less than 10,000 ng/L'),
  pfbsConcentration: z.number().min(0, 'PFBS concentration must be non-negative').max(10000, 'PFBS concentration must be less than 10,000 ng/L'),
  pfhpaConcentration: z.number().min(0, 'PFHpA concentration must be non-negative').max(10000, 'PFHpA concentration must be less than 10,000 ng/L'),
  pfundaConcentration: z.number().min(0, 'PFUnDA concentration must be non-negative').max(10000, 'PFUnDA concentration must be less than 10,000 ng/L'),
  pfdoaConcentration: z.number().min(0, 'PFDoA concentration must be non-negative').max(10000, 'PFDoA concentration must be less than 10,000 ng/L'),
  totalPfasConcentration: z.number().min(0, 'Total PFAS concentration must be non-negative').max(100000, 'Total PFAS concentration must be less than 100,000 ng/L'),
  
  // GAC Properties
  gacType: z.string().min(1, 'GAC type is required'),
  gacDensity: z.number().min(200, 'GAC density must be at least 200 kg/m³').max(1000, 'GAC density must be less than 1,000 kg/m³'),
  gacParticleSize: z.number().min(0.1, 'GAC particle size must be at least 0.1 mm').max(5, 'GAC particle size must be less than 5 mm'),
  gacIodineNumber: z.number().min(200, 'GAC iodine number must be at least 200 mg/g').max(2000, 'GAC iodine number must be less than 2,000 mg/g'),
  gacSurfaceArea: z.number().min(100, 'GAC surface area must be at least 100 m²/g').max(2000, 'GAC surface area must be less than 2,000 m²/g'),
  
  // Economic Parameters
  gacCostPerKg: z.number().min(0, 'GAC cost must be non-negative').max(100, 'GAC cost must be less than $100/kg'),
  replacementCost: z.number().min(0, 'Replacement cost must be non-negative').max(1000000, 'Replacement cost must be less than $1,000,000'),
  laborCost: z.number().min(0, 'Labor cost must be non-negative').max(100000, 'Labor cost must be less than $100,000'),
  disposalCost: z.number().min(0, 'Disposal cost must be non-negative').max(100000, 'Disposal cost must be less than $100,000'),
  
  // Additional Parameters
  operatingDaysPerYear: z.number().min(1, 'Operating days must be at least 1').max(365, 'Operating days must be at most 365'),
  operatingHoursPerDay: z.number().min(1, 'Operating hours must be at least 1').max(24, 'Operating hours must be at most 24'),
  targetRemovalEfficiency: z.number().min(50, 'Target removal efficiency must be at least 50%').max(99.9, 'Target removal efficiency must be at most 99.9%'),
  safetyFactor: z.number().min(1, 'Safety factor must be at least 1').max(5, 'Safety factor must be at most 5'),
})

export type DataSubmissionFormData = z.infer<typeof dataSubmissionSchema>
