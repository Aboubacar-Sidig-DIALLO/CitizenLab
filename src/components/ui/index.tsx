// Composants UI de base

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, FontWeight } from '../../constants/theme';

// Button Component
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  icon?: string;
  disabled?: boolean;
  loading?: boolean;
  style?: any;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon,
  disabled = false,
  loading = false,
  style,
}) => {
  const getButtonStyle = () => {
    const baseStyle: any[] = [styles.button, styles[`button_${size}`]];

    switch (variant) {
      case 'primary':
        baseStyle.push(styles.buttonPrimary);
        break;
      case 'outline':
        baseStyle.push(styles.buttonOutline);
        break;
      case 'ghost':
        baseStyle.push(styles.buttonGhost);
        break;
    }

    if (disabled) {
      baseStyle.push(styles.buttonDisabled);
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle: any[] = [styles.buttonText, styles[`buttonText_${size}`]];

    switch (variant) {
      case 'primary':
        baseStyle.push(styles.buttonTextPrimary);
        break;
      case 'outline':
        baseStyle.push(styles.buttonTextOutline);
        break;
      case 'ghost':
        baseStyle.push(styles.buttonTextGhost);
        break;
    }

    if (disabled) {
      baseStyle.push(styles.buttonTextDisabled);
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size='small'
          color={variant === 'primary' ? Colors.accent : Colors.primary}
        />
      ) : (
        <View style={styles.buttonContent}>
          {icon && (
            <Ionicons
              name={icon as any}
              size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
              color={variant === 'primary' ? Colors.accent : Colors.primary}
              style={styles.buttonIcon}
            />
          )}
          <Text style={getTextStyle()}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// Card Component
interface CardProps {
  children: React.ReactNode;
  style?: any;
  padding?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = Spacing.lg,
}) => {
  return <View style={[styles.card, { padding }, style]}>{children}</View>;
};

// StatCard Component
interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: string;
  color?: string;
  style?: any;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color = Colors.primary,
  style,
}) => {
  return (
    <View style={[styles.statCard, style]}>
      {icon && (
        <View style={[styles.statIcon, { backgroundColor: `${color}20` }]}>
          <Ionicons name={icon as any} size={24} color={color} />
        </View>
      )}
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  );
};

// ModuleCard Component
interface ModuleCardProps {
  title: string;
  description: string;
  category: string;
  progress?: number;
  estimatedTime?: number;
  icon?: string;
  onPress: () => void;
  style?: any;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  category,
  progress = 0,
  estimatedTime,
  icon,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.moduleCard, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.moduleHeader}>
        {icon && (
          <View style={styles.moduleIcon}>
            <Ionicons name={icon as any} size={24} color={Colors.primary} />
          </View>
        )}
        <View style={styles.moduleInfo}>
          <Text style={styles.moduleTitle}>{title}</Text>
          <Text style={styles.moduleCategory}>{category}</Text>
          <Text style={styles.moduleDescription}>{description}</Text>
        </View>
      </View>

      <View style={styles.moduleFooter}>
        {estimatedTime && (
          <View style={styles.moduleTime}>
            <Ionicons
              name='time-outline'
              size={16}
              color={Colors.text.secondary}
            />
            <Text style={styles.moduleTimeText}>{estimatedTime} min</Text>
          </View>
        )}
        {progress > 0 && (
          <View style={styles.moduleProgress}>
            <Text style={styles.moduleProgressText}>
              {Math.round(progress)}%
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

// ProgressBar Component
interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: number;
  style?: any;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = Colors.primary,
  height = 8,
  style,
}) => {
  return (
    <View style={[styles.progressBarContainer, { height }, style]}>
      <View
        style={[
          styles.progressBarFill,
          {
            width: `${Math.min(Math.max(progress, 0), 100)}%`,
            backgroundColor: color,
            height,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Button styles
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button_small: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    minHeight: 36,
  },
  button_medium: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    minHeight: 48,
  },
  button_large: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    minHeight: 56,
  },
  buttonPrimary: {
    backgroundColor: Colors.primary,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  buttonGhost: {
    backgroundColor: 'transparent',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: Spacing.sm,
  },
  buttonText: {
    fontWeight: FontWeight.semibold,
    textAlign: 'center',
  },
  buttonText_small: {
    fontSize: FontSize.sm,
  },
  buttonText_medium: {
    fontSize: FontSize.md,
  },
  buttonText_large: {
    fontSize: FontSize.lg,
  },
  buttonTextPrimary: {
    color: Colors.accent,
  },
  buttonTextOutline: {
    color: Colors.primary,
  },
  buttonTextGhost: {
    color: Colors.primary,
  },
  buttonTextDisabled: {
    opacity: 0.7,
  },

  // Card styles
  card: {
    backgroundColor: Colors.surface.light,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // StatCard styles
  statCard: {
    backgroundColor: Colors.surface.light,
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: 'center',
    flex: 1,
    minWidth: 100,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  statValue: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text.light,
    marginBottom: Spacing.xs,
  },
  statTitle: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  statSubtitle: {
    fontSize: FontSize.tiny,
    color: Colors.text.muted,
    textAlign: 'center',
  },

  // ModuleCard styles
  moduleCard: {
    backgroundColor: Colors.surface.light,
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  moduleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${Colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
    marginBottom: Spacing.xs,
  },
  moduleCategory: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: FontWeight.medium,
    marginBottom: Spacing.xs,
  },
  moduleDescription: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  moduleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleTimeText: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    marginLeft: Spacing.xs,
  },
  moduleProgress: {
    backgroundColor: `${Colors.primary}20`,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
  },
  moduleProgressText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: FontWeight.semibold,
  },

  // ProgressBar styles
  progressBarContainer: {
    backgroundColor: Colors.border.light,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    borderRadius: 6,
  },
});
