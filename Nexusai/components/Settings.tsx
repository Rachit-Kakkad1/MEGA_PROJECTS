import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { User, Bell, Shield, Database } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h2>
        <p className="text-slate-500">Manage your account and platform preferences.</p>
      </div>

      <div className="grid gap-6">
        <Card title="Profile Information">
            <div className="flex items-start gap-6">
                <div className="h-20 w-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                    <User size={32} />
                </div>
                <div className="space-y-4 max-w-md w-full">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">First Name</label>
                            <input type="text" defaultValue="Alex" className="w-full text-sm border-slate-300 rounded-md shadow-sm focus:border-brand-500 focus:ring-brand-500 py-2 px-3 border" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Last Name</label>
                            <input type="text" defaultValue="Developer" className="w-full text-sm border-slate-300 rounded-md shadow-sm focus:border-brand-500 focus:ring-brand-500 py-2 px-3 border" />
                        </div>
                    </div>
                    <div>
                         <label className="block text-xs font-medium text-slate-500 mb-1">Email Address</label>
                         <input type="email" defaultValue="alex@nexus.ai" className="w-full text-sm border-slate-300 rounded-md shadow-sm focus:border-brand-500 focus:ring-brand-500 py-2 px-3 border" />
                    </div>
                    <Button>Save Changes</Button>
                </div>
            </div>
        </Card>

        <Card title="Notifications">
            <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                        <Bell className="text-slate-400" size={20} />
                        <div>
                            <p className="text-sm font-medium text-slate-900">Email Notifications</p>
                            <p className="text-xs text-slate-500">Receive daily summaries and alerts.</p>
                        </div>
                    </div>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                        <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-brand-600 right-5 border-gray-300"/>
                        <label htmlFor="toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer checked:bg-brand-600"></label>
                    </div>
                </div>
                <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                        <Shield className="text-slate-400" size={20} />
                        <div>
                            <p className="text-sm font-medium text-slate-900">Two-Factor Authentication</p>
                            <p className="text-xs text-slate-500">Add an extra layer of security.</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                </div>
            </div>
        </Card>
      </div>
    </div>
  );
};